import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AuctionCanceled } from "../generated/schema"
import { AuctionCanceled as AuctionCanceledEvent } from "../generated/PropertyRegistry/PropertyRegistry"
import { handleAuctionCanceled } from "../src/property-registry"
import { createAuctionCanceledEvent } from "./property-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let propertyAddress = "Example string value"
    let seller = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAuctionCanceledEvent = createAuctionCanceledEvent(
      propertyAddress,
      seller
    )
    handleAuctionCanceled(newAuctionCanceledEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AuctionCanceled created and stored", () => {
    assert.entityCount("AuctionCanceled", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AuctionCanceled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "propertyAddress",
      "Example string value"
    )
    assert.fieldEquals(
      "AuctionCanceled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "seller",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
