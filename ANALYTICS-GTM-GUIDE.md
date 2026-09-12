# Uplof analytics and Tag Manager — simple guide

This guide explains what the tracking on `uplof.me` does and how to use the reports.

## What happens when someone visits

1. The visitor sees the cookie notice.
2. If they choose **Accept**, Uplof loads Google Analytics 4 and Google Tag Manager.
3. A normal visit sends a page-view event to the Uplof property (`G-36B8PX5BFP`).
4. GA4 enhanced measurement can also record scrolls, outbound-link clicks and other basic engagement.
5. If they choose **Decline**, optional analytics is not loaded. The site still works.

## What happens when someone submits a form

When a form is submitted, the site sends:

```text
event: generate_lead
method: website_form
```

This means **someone completed an enquiry action**. It is a lead signal, not proof that the person became a customer or that the email was read. The actual enquiry is still delivered through the site's form/email flow.

Scrolls and page views are engagement signals. They help show whether people are reading the page, but they do not count as leads by themselves.

## What Tag Manager does

The Uplof container is `GTM-KPHGB4RK`. It provides a central place to add or change measurement tags without editing every page. The current published container includes the GA4 base tag. The website also sends the `generate_lead` event directly so the important conversion signal is not lost during navigation.

## How to check that it works

1. Open [Google Analytics](https://analytics.google.com/) with `kumarabhishekbuild@gmail.com`.
2. Go to **Reports → Realtime**.
3. In another browser tab, open `https://uplof.me/` and choose **Accept** on the cookie notice.
4. Visit another section and submit a test enquiry using non-sensitive test details.
5. In Realtime, look for the visit and the `generate_lead` event. Google may take time to populate standard reports.
6. After the first event appears, go to **Admin → Events**, find `generate_lead`, and mark it as a **Key event**. This makes it the conversion metric used in reports.

## Can we know which keywords caused clicks?

**Yes, but the answer depends on the traffic source.**

### Paid campaigns

For Google Ads, link Google Ads to GA4 and keep auto-tagging enabled. Google can then report campaign, ad group and keyword data alongside visits and conversions. For other paid campaigns, add UTM parameters such as:

```text
https://uplof.me/?utm_source=linkedin&utm_medium=paid&utm_campaign=seo-leads&utm_content=variant-a
```

### Organic Google searches

Connect Google Search Console to GA4. Search Console can show which queries generated impressions and clicks, while GA4 shows landing-page engagement and `generate_lead` conversions. Google intentionally keeps the two datasets partly separate, so an exact “this person searched this keyword and then submitted” trail is generally not available.

The practical view is: **query → landing page → engagement → lead event**, compared in aggregate.

### What we can add next

- Preserve UTM, `gclid` and landing-page values in the enquiry flow as non-personal campaign metadata.
- Add first-touch and last-touch source fields to lead notifications.
- Create GA4 reports for landing page, source/medium, campaign and `generate_lead`.
- Link Search Console and Google Ads to the same GA4 property.

Do not send names, email addresses, phone numbers or message text to Analytics or Tag Manager. Those systems should receive event and campaign metadata only.

## Plain-English summary

**Visits tell us who arrived. Scrolls tell us who engaged. `generate_lead` tells us who raised their hand. UTMs, Google Ads and Search Console tell us which campaign or search topic brought them in.**

