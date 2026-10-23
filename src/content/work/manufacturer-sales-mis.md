---
title: "A sales MIS on a legacy system in six days"
client: "A mid-size electrical components manufacturer, South India"
sector: "Manufacturing"
summary: "The sales system was a VB6 application on a single database. Six days after the first meeting, the leadership team was drilling from unit to product to customer in Metabase, and asking questions of the data in plain language from their phones."
industry: manufacturing
challenge: "Sales data for a multi-plant manufacturer lived in a VB6 application. Leadership waited on manual reports."
approach: "We loaded one month of sales into ClickHouse, built drill-downs in Metabase and let leadership ask questions in plain language."
result: "A working demo six days after the first meeting, and three workstreams agreed in the same room."
published: 2026-10-22
services: ["ai-reporting", "ai-automation"]
principles: ["removes-steps", "fixed-scope"]
status: "Live, expanding"
order: 2
metrics:
  - value: "6 days"
    label: "first meeting to working demo"
  - value: "3 levels"
    label: "unit, product and customer drill-down"
  - value: "3"
    label: "workstreams agreed after the demo"
tags: ["MIS", "ClickHouse", "Metabase", "manufacturing", "legacy systems"]
---

## The challenge

A high-volume catalogue manufacturer with several plants and a large export business. Sales data lived in a legacy VB6 application backed by one database. Leadership wanted unit-wise sales, drilling down to product and customer, without waiting on manual reports.

## What we did

We did not start with a strategy deck. We asked for one month of sales data, loaded it into ClickHouse, built the unit to product to customer drill-down in Metabase, and connected Claude to Metabase so people could ask for a chart in plain language, including on mobile.

The demo ran six days after the first meeting.

## What came out of it

The room went straight from the demo to three concrete workstreams:

1. MIS for sales and purchase, fronted by a chat interface.
2. An export documentation agent for the repetitive paperwork across many export markets.
3. A daily report of alerts on what was missed in email.

## What is still open

The next step is reading the VB6 source to confirm exactly which tables and fields the old system relies on. A reporting layer is only useful once its numbers reconcile with the source, so that reconciliation is the gate for everything else.
