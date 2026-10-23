---
title: "Five hours of manual device checks, down to thirty minutes"
client: "A smartphone distributor"
sector: "Distribution"
summary: "An operator checked about 200 handsets a day, one serial at a time, on a public web page. We built a human-in-the-loop runner that does everything except the captcha, and declined to automate the captcha on purpose."
industry: distribution
challenge: "An operator checked about 200 handsets a day, one serial at a time, on a public web page with a captcha."
approach: "A human-in-the-loop runner: the tool handles the queue, parsing, retries and records. The operator only solves the captcha."
result: "Expected time for 200 devices drops from about five hours to about thirty minutes, without risking the brand relationship."
published: 2026-10-22
services: ["ai-automation"]
principles: ["standard-vs-exceptions", "when-not-to-build", "removes-steps"]
status: "Built, in shakedown"
order: 4
metrics:
  - value: "~5 hrs"
    label: "operator time per day before"
  - value: "~30 min"
    label: "expected for the same 200 devices"
  - value: "0"
    label: "third-party dependencies"
tags: ["automation", "human in the loop", "operations", "browser automation"]
---

## The challenge

The distributor needs to know whether each handset has already been activated, for inventory checks and to catch grey-market stock. The only route was the brand's public coverage page: type a serial, solve a captcha, read the result. About 90 seconds a device, roughly 200 devices a day. Close to a full-time job.

## What we found

We mapped how the page works. The serial is submitted inside the captcha validation call, so it is one captcha per device by design, and the page has several other protections behind it. We also found that the page does not show activation directly. It is being inferred from warranty dates, which is unreliable for some units.

## What we built

A small batch runner that drives a real browser. The operator solves each captcha. The tool handles the queue, captures and parses the response, records results, resumes after interruptions and backs off when rate-limited. Expected time for 200 devices drops from about five hours to about thirty minutes.

## What we chose not to do

We did not automate the captcha. A vision model could read it, so this was not a technical limit. Doing it at volume would mean working around the page's other protections, and the client is an official channel partner of the brand. The downside of being detected is a damaged channel relationship, which is a poor trade against a tool that already recovers most of the time.

The real fix is proper channel access that returns a true activation flag, and that request is in progress alongside the stopgap.
