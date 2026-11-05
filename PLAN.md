# CampusCart Implementation Plan

## Purpose

A small, realistic student marketplace for demonstrating Sentinel's browser
observations, security signals, evidence, and remediation comparisons. This is
an intentionally insecure LOCAL training target, not a production application.

## Boundaries

- All new application code lives in `demo-site/`. Do not modify Sentinel.
- Next.js App Router, TypeScript, CSS, fake in-memory catalogue.
- No real passwords, payments, personal data, messages, or external APIs.
- Listen on `127.0.0.1:4567` only; validate Host and mutation Origin.
- All fonts and photography are local after dependency/asset installation.
- Mode is process-wide, starts vulnerable, and resets on server restart.

## Build Order

1. Create the standalone project and this implementation plan.
2. Build a responsive cream/forest-green marketplace: home, search, product,
   saved items, pickup bag, demo sign-in, and account.
3. Add a persistent lab banner and a guide containing the demonstration steps.
4. Implement one loopback-only Next.js server that centrally applies or omits
   defensive headers according to the selected mode.
5. Add cookie, CORS, sandboxed reflection, and controlled console-error examples.
6. Test policy functions, actual HTTP responses, UI interactions, mobile layout,
   and production build. Document startup, reset, and measurement limits.

## Scenarios

| Scenario | Vulnerable | Hardened | Demonstration |
| --- | --- | --- | --- |
| Document headers | Selected headers omitted | CSP with script nonces, nosniff, frame, referrer, permissions, CORP | Passive configuration signals |
| Demo cookie | Missing security attributes | HttpOnly, Secure, SameSite=Lax | Cookie attributes on `/login` and `/account` |
| Account API CORS | Wildcard plus credentials | Same-origin only | Misconfiguration, NOT proof of browser-readable credentialed data |
| Reflection | Raw HTML interpolation | Context-escaped output | Compare harmless markup in an isolated sandbox |
| Browser error | Explicit fake diagnostic logged by user action | Generic handled message | Browser telemetry, NOT a confirmed vulnerability |

## Honest Limits

- Plain HTTP does not demonstrate HSTS or HTTPS mixed content.
- Missing headers are security posture observations, not proof of exploitation.
- The existing Sentinel alphanumeric canary cannot distinguish safely escaped
  text from unsafe interpolation. Both can still reflect that token. Do not
  claim a verified XSS or reflection remediation from that result alone.
- Secure cookies can behave differently on HTTP loopback between browsers.
  Demonstrate the Set-Cookie response attributes, not production authentication.
- Real page navigations intentionally use anchors/forms so Sentinel can observe
  main-document responses instead of only client-side router updates.
- Mode changes are full navigations on the same origin and same page paths.
- The reflection route remains CSP-sandboxed in BOTH modes.
- No additional vulnerability categories are claimed without matching evidence.
