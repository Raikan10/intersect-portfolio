---
title: "Dealer price queries on WhatsApp"
client: "An HP and BenQ distribution business, South India"
sector: "Distribution"
summary: "We read every message in two dealer WhatsApp groups to find out whether a bot was worth building. The answer was a salesperson copilot, and the real prerequisite was a clean price list."
status: "Pilot scoped"
order: 1
metrics:
  - value: "510"
    label: "messages analysed over 110 days"
  - value: "3 min"
    label: "median reply time"
  - value: "12%"
    label: "query threads dropped or left hanging"
tags: ["WhatsApp", "sales operations", "distribution", "copilot"]
---

## Situation

Dealers ask for prices and stock in WhatsApp groups. The question on the table was whether to put the WhatsApp Business API and a bot in front of them, and whether message costs would make that uneconomic across roughly 850 dealers.

## What we found

We classified every message in two dealer groups by hand-checked rules and grouped them into query threads.

- 96% of dealer threads open with "price of model X" or "price and stock". Orders, payments, delivery and schemes together are under 2% of messages.
- The team is already fast in the typical case. The median time to a real answer is 3 minutes.
- The problem is the tail. The 90th percentile is 70 minutes, and 22 of 186 query threads (12%) were never answered, answered only after the dealer asked again, or got "will revert" and nothing after.
- Most misses were laptops described by spec, not printers asked for by model number.
- Message cost is not the constraint. Even the worst case at full dealer scale breaks even with a handful of extra laptop sales a month.

## What we recommended

A copilot for the salesperson, not a dealer-facing bot: drafted price and stock replies for a person to send, and alerts for threads that have gone quiet. The prerequisite is a clean daily price list, stock status and a laptop spec catalogue. Without those, any bot would answer confidently and wrongly.

## What we chose not to do

We did not recommend replacing the salesperson in the group. Dealers trust a named person, and the data showed speed was already good in most cases. The value is in catching the 12%.
