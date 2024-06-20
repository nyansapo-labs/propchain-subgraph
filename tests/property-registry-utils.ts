import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AuctionCanceled,
  AuctionCreated,
  AuctionEnded,
  BidPlaced,
  OwnershipTransferred,
  PropertyDocsUpdated,
  PropertyPriceUpdated,
  PropertyRegistered,
  PropertyTransferred,
  PropertyVerified,
  TransactionCompleted,
  TransactionConfirmed,
  TransactionInitiated
} from "../generated/PropertyRegistry/PropertyRegistry"

export function createAuctionCanceledEvent(
  propertyAddress: string,
  seller: Address
): AuctionCanceled {
  let auctionCanceledEvent = changetype<AuctionCanceled>(newMockEvent())

  auctionCanceledEvent.parameters = new Array()

  auctionCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "propertyAddress",
      ethereum.Value.fromString(propertyAddress)
    )
  )
  auctionCanceledEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return auctionCanceledEvent
}

export function createAuctionCreatedEvent(
  propertyAddress: string,
  seller: Address,
  startingPrice: BigInt,
  auctionEndTime: BigInt
): AuctionCreated {
  let auctionCreatedEvent = changetype<AuctionCreated>(newMockEvent())

  auctionCreatedEvent.parameters = new Array()

  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "propertyAddress",
      ethereum.Value.fromString(propertyAddress)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startingPrice",
      ethereum.Value.fromUnsignedBigInt(startingPrice)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionEndTime",
      ethereum.Value.fromUnsignedBigInt(auctionEndTime)
    )
  )

  return auctionCreatedEvent
}

export function createAuctionEndedEvent(
  propertyAddress: string,
  highestBidder: Address,
  highestBid: BigInt
): AuctionEnded {
  let auctionEndedEvent = changetype<AuctionEnded>(newMockEvent())

  auctionEndedEvent.parameters = new Array()

  auctionEndedEvent.parameters.push(
    new ethereum.EventParam(
      "propertyAddress",
      ethereum.Value.fromString(propertyAddress)
    )
  )
  auctionEndedEvent.parameters.push(
    new ethereum.EventParam(
      "highestBidder",
      ethereum.Value.fromAddress(highestBidder)
    )
  )
  auctionEndedEvent.parameters.push(
    new ethereum.EventParam(
      "highestBid",
      ethereum.Value.fromUnsignedBigInt(highestBid)
    )
  )

  return auctionEndedEvent
}

export function createBidPlacedEvent(
  propertyAddress: string,
  bidder: Address,
  amount: BigInt
): BidPlaced {
  let bidPlacedEvent = changetype<BidPlaced>(newMockEvent())

  bidPlacedEvent.parameters = new Array()

  bidPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "propertyAddress",
      ethereum.Value.fromString(propertyAddress)
    )
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return bidPlacedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPropertyDocsUpdatedEvent(
  gpsAddress: string,
  newDocumentHash: string
): PropertyDocsUpdated {
  let propertyDocsUpdatedEvent = changetype<PropertyDocsUpdated>(newMockEvent())

  propertyDocsUpdatedEvent.parameters = new Array()

  propertyDocsUpdatedEvent.parameters.push(
    new ethereum.EventParam("gpsAddress", ethereum.Value.fromString(gpsAddress))
  )
  propertyDocsUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newDocumentHash",
      ethereum.Value.fromString(newDocumentHash)
    )
  )

  return propertyDocsUpdatedEvent
}

export function createPropertyPriceUpdatedEvent(
  gpsAddress: string,
  oldPrice: BigInt,
  newPrice: BigInt
): PropertyPriceUpdated {
  let propertyPriceUpdatedEvent = changetype<PropertyPriceUpdated>(
    newMockEvent()
  )

  propertyPriceUpdatedEvent.parameters = new Array()

  propertyPriceUpdatedEvent.parameters.push(
    new ethereum.EventParam("gpsAddress", ethereum.Value.fromString(gpsAddress))
  )
  propertyPriceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldPrice",
      ethereum.Value.fromUnsignedBigInt(oldPrice)
    )
  )
  propertyPriceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newPrice",
      ethereum.Value.fromUnsignedBigInt(newPrice)
    )
  )

  return propertyPriceUpdatedEvent
}

export function createPropertyRegisteredEvent(
  gpsAddress: string,
  owner: Address,
  location: string,
  ipfsHash: string
): PropertyRegistered {
  let propertyRegisteredEvent = changetype<PropertyRegistered>(newMockEvent())

  propertyRegisteredEvent.parameters = new Array()

  propertyRegisteredEvent.parameters.push(
    new ethereum.EventParam("gpsAddress", ethereum.Value.fromString(gpsAddress))
  )
  propertyRegisteredEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  propertyRegisteredEvent.parameters.push(
    new ethereum.EventParam("location", ethereum.Value.fromString(location))
  )
  propertyRegisteredEvent.parameters.push(
    new ethereum.EventParam("ipfsHash", ethereum.Value.fromString(ipfsHash))
  )

  return propertyRegisteredEvent
}

export function createPropertyTransferredEvent(
  gpsAddress: string,
  oldOwner: Address,
  newOwner: Address
): PropertyTransferred {
  let propertyTransferredEvent = changetype<PropertyTransferred>(newMockEvent())

  propertyTransferredEvent.parameters = new Array()

  propertyTransferredEvent.parameters.push(
    new ethereum.EventParam("gpsAddress", ethereum.Value.fromString(gpsAddress))
  )
  propertyTransferredEvent.parameters.push(
    new ethereum.EventParam("oldOwner", ethereum.Value.fromAddress(oldOwner))
  )
  propertyTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return propertyTransferredEvent
}

export function createPropertyVerifiedEvent(
  gpsAddress: string
): PropertyVerified {
  let propertyVerifiedEvent = changetype<PropertyVerified>(newMockEvent())

  propertyVerifiedEvent.parameters = new Array()

  propertyVerifiedEvent.parameters.push(
    new ethereum.EventParam("gpsAddress", ethereum.Value.fromString(gpsAddress))
  )

  return propertyVerifiedEvent
}

export function createTransactionCompletedEvent(
  gpsAddress: string,
  seller: Address,
  buyer: Address
): TransactionCompleted {
  let transactionCompletedEvent = changetype<TransactionCompleted>(
    newMockEvent()
  )

  transactionCompletedEvent.parameters = new Array()

  transactionCompletedEvent.parameters.push(
    new ethereum.EventParam("gpsAddress", ethereum.Value.fromString(gpsAddress))
  )
  transactionCompletedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  transactionCompletedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )

  return transactionCompletedEvent
}

export function createTransactionConfirmedEvent(
  gpsAddress: string,
  buyer: Address,
  seller: Address
): TransactionConfirmed {
  let transactionConfirmedEvent = changetype<TransactionConfirmed>(
    newMockEvent()
  )

  transactionConfirmedEvent.parameters = new Array()

  transactionConfirmedEvent.parameters.push(
    new ethereum.EventParam("gpsAddress", ethereum.Value.fromString(gpsAddress))
  )
  transactionConfirmedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  transactionConfirmedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return transactionConfirmedEvent
}

export function createTransactionInitiatedEvent(
  gpsAddress: string,
  buyer: Address,
  seller: Address
): TransactionInitiated {
  let transactionInitiatedEvent = changetype<TransactionInitiated>(
    newMockEvent()
  )

  transactionInitiatedEvent.parameters = new Array()

  transactionInitiatedEvent.parameters.push(
    new ethereum.EventParam("gpsAddress", ethereum.Value.fromString(gpsAddress))
  )
  transactionInitiatedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  transactionInitiatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return transactionInitiatedEvent
}
