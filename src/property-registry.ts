import {BigInt, Address} from "@graphprotocol/graph-ts";
import {
  AuctionCanceled as AuctionCanceledEvent,
  AuctionCreated as AuctionCreatedEvent,
  BidPlaced as BidPlacedEvent,
  AuctionEnded as AuctionEndedEvent,
  PropertyRegistered as PropertyRegisteredEvent,
  PropertyVerified as PropertyVerifiedEvent,
  PropertyPriceUpdated as PropertyPriceUpdatedEvent,
  PropertyTransferred as PropertyTransferredEvent,
  PropertyDocsUpdated as PropertyDocsUpdatedEvent,
  TransactionInitiated as TransactionInitiatedEvent,
  TransactionConfirmed as TransactionConfirmedEvent,
  TransactionCompleted as TransactionCompletedEvent,
} from "../generated/PropertyRegistry/PropertyRegistry";
import {
  Property,
  Transaction,
  Auction as AuctionEntity,
  AuctionEvent,
} from "../generated/schema";

export function handlePropertyRegistered(event: PropertyRegisteredEvent): void {
  let property = new Property(event.params.gpsAddress.toString());
  property.owner = event.params.owner;
  property.location = event.params.location;
  property.gpsAddress = event.params.gpsAddress.toString();
  property.ipfsHash = event.params.ipfsHash;
  property.isVerified = false;
  property.price = BigInt.fromI32(0);
  property.biddingStarted = false;
  property.isAuctionActive = false;
  property.save();
}

export function handlePropertyVerified(event: PropertyVerifiedEvent): void {
  let property = Property.load(event.params.gpsAddress.toString());
  if (property) {
    property.isVerified = true;
    property.save();
  }
}

export function handlePropertyPriceUpdated(
  event: PropertyPriceUpdatedEvent
): void {
  let property = Property.load(event.params.gpsAddress.toString());
  if (property) {
    property.price = event.params.newPrice;
    property.save();
  }
}

export function handlePropertyTransferred(
  event: PropertyTransferredEvent
): void {
  let property = Property.load(event.params.gpsAddress.toString());
  if (property) {
    property.owner = event.params.newOwner;
    property.save();
  }
}

export function handlePropertyDocsUpdated(
  event: PropertyDocsUpdatedEvent
): void {
  let property = Property.load(event.params.gpsAddress.toString());
  if (property) {
    property.ipfsHash = event.params.newDocumentHash;
    property.save();
  }
}

export function handleTransactionInitiated(
  event: TransactionInitiatedEvent
): void {
  let transaction = new Transaction(event.params.gpsAddress.toString());
  transaction.property = event.params.gpsAddress.toString();
  transaction.gpsAddress = event.params.gpsAddress.toString();
  transaction.buyer = event.params.buyer;
  transaction.seller = event.params.seller;
  transaction.buyerConfirmed = false;
  transaction.sellerConfirmed = false;
  transaction.adminConfirmed = false;
  transaction.isActive = true;
  transaction.save();
}

export function handleTransactionConfirmed(
  event: TransactionConfirmedEvent
): void {
  let transaction = Transaction.load(event.params.gpsAddress.toString());
  if (transaction) {
    if (event.params.buyer == transaction.buyer) {
      transaction.buyerConfirmed = true;
    } else if (event.params.seller == transaction.seller) {
      transaction.sellerConfirmed = true;
    }
    transaction.save();
  }
}

export function handleTransactionCompleted(
  event: TransactionCompletedEvent
): void {
  let transaction = Transaction.load(event.params.gpsAddress.toString());
  if (transaction) {
    transaction.isActive = false;
    transaction.save();
  }
}

export function handleAuctionCreated(event: AuctionCreatedEvent): void {
  let auction = new AuctionEntity(event.params.propertyAddress.toString());
  auction.propertyAddress = event.params.propertyAddress.toString();
  auction.seller = event.params.seller;
  auction.startingPrice = event.params.startingPrice;
  auction.highestBid = BigInt.fromI32(0);
  auction.highestBidder = null;
  auction.auctionEndTime = event.params.auctionEndTime;
  auction.isActive = true;
  auction.bidPlaced = false;
  auction.save();

  let auctionEvent = new AuctionEvent(event.transaction.hash.toHex());
  auctionEvent.auctionId = event.params.propertyAddress.toString();
  auctionEvent.eventType = "AuctionCreated";
  auctionEvent.eventTimestamp = event.block.timestamp;
  auctionEvent.save();
}

export function handleBidPlaced(event: BidPlacedEvent): void {
  let auction = AuctionEntity.load(event.params.propertyAddress.toString());
  if (auction) {
    auction.highestBidder = event.params.bidder;
    auction.highestBid = event.params.amount;
    auction.bidPlaced = true;
    auction.save();

    let auctionEvent = new AuctionEvent(event.transaction.hash.toHex());
    auctionEvent.auctionId = event.params.propertyAddress.toString();
    auctionEvent.eventType = "BidPlaced";
    auctionEvent.eventTimestamp = event.block.timestamp;
    auctionEvent.bidder = event.params.bidder;
    auctionEvent.bidAmount = event.params.amount;
    auctionEvent.save();
  }
}

export function handleAuctionEnded(event: AuctionEndedEvent): void {
  let auction = AuctionEntity.load(event.params.propertyAddress.toString());
  if (auction) {
    auction.isActive = false;
    auction.highestBidder = event.params.highestBidder.equals(Address.zero())
      ? null
      : event.params.highestBidder;
    auction.save();

    let auctionEvent = new AuctionEvent(event.transaction.hash.toHex());
    auctionEvent.auctionId = event.params.propertyAddress.toString();
    auctionEvent.eventType = "AuctionEnded";
    auctionEvent.eventTimestamp = event.block.timestamp;
    auctionEvent.bidder = event.params.highestBidder.equals(Address.zero())
      ? null
      : event.params.highestBidder;
    auctionEvent.bidAmount = event.params.highestBid;
    auctionEvent.save();
  }
}

export function handleAuctionCanceled(event: AuctionCanceledEvent): void {
  let auction = AuctionEntity.load(event.params.propertyAddress.toString());
  if (auction) {
    auction.isActive = false;
    auction.save();

    let auctionEvent = new AuctionEvent(event.transaction.hash.toHex());
    auctionEvent.auctionId = event.params.propertyAddress.toString();
    auctionEvent.eventType = "AuctionCanceled";
    auctionEvent.eventTimestamp = event.block.timestamp;
    auctionEvent.save();
  }
}
