```md
# CURIOUS REALITY — SOURCES INDEX

## STATUS

Document Type: Source Registry, Evidence Tracking & Research Reference System
Brand: Curious Reality
Authority: Derived from CURIOUS_REALITY_MASTER_ARCHITECTURE.md

Purpose:

Maintain a structured, reusable, traceable index of sources used by Curious Reality research, scripts, articles, videos, claims, and knowledge assets.

This file is the human-readable source registry.

The source system may later evolve into:

- JSON;
- database records;
- a searchable research system;
- knowledge graph nodes;
- AI retrieval data;
- source APIs.

The conceptual rules in this document should remain stable even when implementation changes.

---

# 1. SOURCE SYSTEM PURPOSE

Curious Reality is research-driven.

Important content should be supported by appropriate evidence.

The source system exists to answer:

What source supports this claim?

Where did this information come from?

How authoritative is the source?

What exactly does the source establish?

When was the source published?

When was it last checked?

Which videos and articles use it?

Is the source still current?

The objective is:

TRACEABLE KNOWLEDGE.

---

# 2. CORE SOURCE PRINCIPLE

Do not collect sources merely because they contain relevant keywords.

A source should be connected because it meaningfully supports:

- a claim;
- an event;
- a concept;
- a mechanism;
- a statistic;
- a historical statement;
- a technical specification;
- or another research requirement.

Every source relationship should have a reason.

---

# 3. SOURCE HIERARCHY

Preferred source priority:

1. Primary documents and data
2. Official institutions
3. Peer-reviewed research
4. Authoritative books and reference material
5. High-quality reporting
6. Strong secondary explainers

The strongest appropriate source should be preferred for the claim being made.

Source quality must always be judged relative to the type of information being verified.

---

# 4. PRIMARY SOURCE

A Primary Source is direct evidence or original documentation.

Examples may include:

- original datasets;
- official records;
- original research papers;
- technical documentation;
- government documents;
- court documents;
- original measurements;
- first-party announcements;
- historical primary documents.

Preferred when the underlying fact can be obtained directly.

---

# 5. OFFICIAL SOURCE

An Official Source is published by an institution or organization with direct authority over the relevant subject.

Examples may include:

- government agencies;
- universities;
- scientific institutions;
- standards organizations;
- official company documentation;
- public agencies;
- recognized international institutions.

Use official sources when they are directly relevant.

---

# 6. PEER-REVIEWED RESEARCH

Research literature is especially important for:

- science;
- medicine;
- psychology;
- engineering;
- technology;
- biology;
- economics;
- other evidence-based subjects.

Record enough information to identify the exact research publication.

At minimum, preserve where available:

- title;
- authors;
- journal;
- publication date;
- DOI;
- URL;
- relevant finding;
- limitations.

---

# 7. BOOKS AND REFERENCE MATERIAL

Authoritative books and reference works can provide:

- historical context;
- technical explanation;
- established background;
- conceptual foundations.

When using a book, record:

- title;
- author;
- edition where relevant;
- publisher;
- publication year;
- chapter/page where practical.

Do not rely on a general reference when a more direct primary source is available for a specific claim.

---

# 8. HIGH-QUALITY REPORTING

High-quality journalism may be appropriate for:

- current events;
- breaking developments;
- investigations;
- interviews;
- documented events;
- reporting where primary information is not yet publicly available.

When using reporting:

Check:

- publication;
- author;
- publication date;
- evidence cited by the reporter;
- whether the report is original or derivative;
- whether later reporting changed the facts.

Reporting should not automatically be treated as primary evidence.

---

# 9. SECONDARY EXPLAINERS

Secondary explainers can help with:

- orientation;
- terminology;
- background;
- identifying primary sources;
- understanding complex subjects.

They should not automatically be treated as final authority.

When possible:

Secondary Explainer
→ identify Primary / Official / Research Source
→ verify the underlying claim

---

# 10. SOURCE ID

Every important source should have a stable internal Source ID.

Example:

```text
source-0001
source-0002
source-0003
```

A Source ID should remain stable after creation.

Do not use the source title as its permanent identifier.

---

# 11. SOURCE RECORD

Use the following general source record structure:

```yaml
source_id:
title:
source_type:

author:
publisher:
institution:

url:
doi:

publication_date:
access_date:
last_verified:

topic:
keywords:

summary:
claims_supported:

reliability_notes:
limitations:

used_by_videos:
used_by_articles:
used_by_claims:

status:
```

Not every field is mandatory for every source.

---

# 12. MINIMUM SOURCE RECORD

A source can begin with:

```yaml
source_id:
title:
source_type:
url:
access_date:
```

Then additional metadata can be added later.

The goal is to keep source capture easy enough that researchers actually maintain it.

---

# 13. SOURCE TYPE VALUES

Preferred normalized values:

```text
PRIMARY_DOCUMENT
PRIMARY_DATA
OFFICIAL_SOURCE
RESEARCH_PAPER
PEER_REVIEWED_STUDY
BOOK
REFERENCE
HIGH_QUALITY_REPORTING
SECONDARY_EXPLAINER
DATASET
ARCHIVE
TECHNICAL_DOCUMENTATION
COURT_DOCUMENT
GOVERNMENT_RECORD
INTERVIEW
OTHER
```

Only create additional categories when useful.

---

# 14. SOURCE STATUS

Suggested source states:

```text
DISCOVERED
REVIEWING
VERIFIED
ACTIVE
OUTDATED
SUPERSEDED
UNAVAILABLE
REJECTED
ARCHIVED
```

Meaning:

DISCOVERED:
Found but not sufficiently evaluated.

REVIEWING:
Currently being assessed.

VERIFIED:
Checked and judged appropriate for the intended claim.

ACTIVE:
Currently useful and sufficiently current.

OUTDATED:
Information may no longer represent current reality.

SUPERSEDED:
Replaced by a newer or more authoritative source.

UNAVAILABLE:
Previously accessible but no longer available.

REJECTED:
Evaluated and intentionally not used.

ARCHIVED:
Retained for historical reference.

---

# 15. SOURCE RELEVANCE

A source should be evaluated for:

- authority;
- directness;
- relevance;
- evidence quality;
- publication date;
- currentness where necessary;
- methodology;
- limitations.

Do not confuse relevance with authority.

A highly relevant source can still be weak evidence.

---

# 16. SOURCE DIRECTNESS

Classify how directly the source supports the claim.

Example:

```text
DIRECT

The source explicitly states or demonstrates the claim.

INDIRECT

The source provides evidence from which the claim can reasonably be derived.

CONTEXT

The source provides useful background but does not itself establish the claim.
```

This prevents overclaiming.

---

# 17. CLAIM-SOURCE MAPPING

Important claims should be mapped to sources.

Example:

```text
Claim:
X happens because of Y.

Source:
source-0032

Support Type:
DIRECT

Notes:
Source explains the mechanism in section 4.
```

This creates traceability.

---

# 18. CLAIM EVIDENCE STATUS

Claims supported by sources should still be classified as:

```text
ESTABLISHED
STRONG_CONSENSUS
EVIDENCE_BACKED_INTERPRETATION
UNCERTAIN
DISPUTED
SPECULATIVE
```

A source existing does not automatically make a claim established.

The evidence must support the strength of the claim.

---

# 19. SOURCE-CONFLICT SYSTEM

Multiple credible sources may disagree.

When this happens:

1. Record all relevant sources.
2. Record the specific disagreement.
3. Compare evidence quality.
4. Determine whether one source is more authoritative.
5. Determine whether disagreement remains.
6. Preserve meaningful uncertainty.

Do not silently choose the source with the most convenient conclusion.

---

# 20. CONFLICT RECORD

Use:

```yaml
conflict_id:
claim:
source_a:
source_b:

difference:

source_a_position:
source_b_position:

evidence_assessment:

current_conclusion:

uncertainty:
last_reviewed:
```

This can later become useful for AI-assisted research.

---

# 21. SOURCE DATE

Always preserve publication date when available.

For time-sensitive information, also preserve:

```text
access_date
last_verified
```

This is especially important for:

- software;
- technology;
- company information;
- laws;
- policies;
- scientific updates;
- statistics;
- current events;
- market information.

---

# 22. TEMPORAL VALIDITY

Some sources remain useful indefinitely.

Others can become outdated.

Examples:

```text
Historical document
→ may remain permanently relevant.

Software documentation
→ may become outdated.

Technical specification
→ may change.

Current policy
→ may change.

Scientific understanding
→ may evolve.
```

The source registry should make these distinctions visible.

---

# 23. SOURCE VERSIONING

When a source changes over time, preserve the relevant version when possible.

Record:

```text
source_id
version
publication_date
last_modified
access_date
archived_copy
```

Do not assume a live web page will always remain identical.

---

# 24. ARCHIVED SOURCE

For important evidence, preserve an archival reference when practical.

Possible methods:

- archived URL;
- downloaded document;
- stored PDF;
- repository copy;
- citation metadata.

Do not rely exclusively on a fragile source if the evidence is central to an important investigation.

---

# 25. SOURCE FILE STORAGE

When local research files exist, use predictable organization.

Suggested structure:

```text
research/
└── <video-id>/
    ├── notes.md
    ├── sources.md
    ├── documents/
    ├── datasets/
    └── media/
```

The exact implementation may change.

The relationship between research and video should remain traceable.

---

# 26. SOURCE URL RULE

Store the canonical source URL where possible.

Avoid:

- unnecessary tracking parameters;
- shortened URLs when the canonical destination is available;
- broken redirects;
- unrelated landing pages.

When a URL contains campaign parameters, preserve the clean canonical URL where practical.

---

# 27. SOURCE TITLE RULE

Record the actual title of the source.

Do not rewrite the source title to make it sound more authoritative.

If a title is unclear, add an internal description separately.

---

# 28. AUTHOR RULE

Where available, preserve:

- author;
- authors;
- institution;
- organization;
- research group.

Do not invent authorship.

If no individual author is listed, record the publishing organization.

---

# 29. PUBLISHER / INSTITUTION RULE

Record the organization responsible for publishing the source.

Examples:

```text
University
Government Agency
Research Journal
Company
Museum
News Organization
Scientific Institution
```

This helps evaluate source authority.

---

# 30. DOI / IDENTIFIER SYSTEM

Where available, preserve persistent identifiers such as:

- DOI;
- ISBN;
- report number;
- dataset identifier;
- court case number;
- government document number;
- official record identifier.

Persistent identifiers improve long-term traceability.

---

# 31. SOURCE SUMMARY

Each important source should have a short internal summary.

The summary should answer:

What does this source actually provide?

Example:

```text
Provides experimental measurements supporting the relationship between X and Y.
```

Do not write vague summaries such as:

```text
Good source about the topic.
```

---

# 32. SOURCE CLAIMS

Record which claims the source supports.

Example:

```yaml
claims_supported:
  - claim-0007
  - claim-0012
  - claim-0020
```

Where useful, add a short note explaining exactly what portion supports the claim.

---

# 33. SOURCE USAGE BY VIDEO

Track videos that use the source.

Example:

```yaml
used_by_videos:
  - video-0004
  - video-0017
```

This allows one source to support multiple pieces of content.

---

# 34. SOURCE USAGE BY ARTICLE

Track website articles that use the source.

Example:

```yaml
used_by_articles:
  - article-0004
  - article-0017
```

This helps maintain source consistency between video and website.

---

# 35. SOURCE REUSE PRINCIPLE

A reliable source may support multiple:

- videos;
- articles;
- claims;
- concepts;
- events.

Do not duplicate the source record each time it is reused.

Create one canonical source entity and link to it.

---

# 36. SOURCE REJECTION

A source may be rejected because of:

- weak evidence;
- poor authority;
- insufficient detail;
- outdated information;
- unsupported claim;
- circular citation;
- plagiarism concerns;
- unreliable methodology;
- unverifiable content;
- misleading presentation.

Record the reason when practical.

---

# 37. CIRCULAR SOURCING

Watch for situations where multiple websites repeat the same claim but all trace back to one weak or incorrect origin.

Example:

```text
Website A
↓
Website B
↓
Website C
↓
Original unsupported claim
```

The number of websites repeating a claim does not establish truth.

Trace the claim to its strongest available origin.

---

# 38. SOURCE CHAIN

When useful, model the research chain:

```text
SOURCE A
→ cites
→ SOURCE B
→ cites
→ PRIMARY SOURCE
```

The AI should prefer the strongest relevant source in the chain.

Do not treat citation count as evidence quality.

---

# 39. SOURCE QUALITY NOTES

A source record may contain:

```yaml
reliability_notes:
limitations:
methodology_notes:
```

These notes should be factual and specific.

Example:

```text
Reliability:
Official measurement.

Limitation:
Measurement covers only the period 2023–2025.
```

Avoid emotional or subjective labels without evidence.

---

# 40. SOURCE FOR TECHNICAL CONTENT

For technical topics, prefer:

- manufacturer documentation;
- technical standards;
- engineering references;
- research papers;
- official specifications;
- documented measurements.

Where multiple versions exist, verify the exact model, version, or standard.

---

# 41. SOURCE FOR SCIENCE

For scientific content, prioritize:

- original research;
- peer-reviewed literature;
- scientific institutions;
- official datasets;
- authoritative reference sources.

Where evidence is preliminary, preserve that status.

---

# 42. SOURCE FOR HISTORY

For historical content, prioritize:

- primary records;
- archives;
- historical documents;
- academic research;
- authoritative historical references.

Preserve competing interpretations when they materially affect the conclusion.

---

# 43. SOURCE FOR CURRENT EVENTS

For current events:

- verify dates;
- verify names;
- verify event status;
- distinguish reports from confirmed facts;
- check multiple reliable sources when practical;
- prefer official records where available.

Current information can change quickly.

Always track verification timing when relevant.

---

# 44. SOURCE FOR LAW

Legal information requires:

- jurisdiction;
- date;
- official legal source where possible;
- court or statutory context.

Do not generalize one jurisdiction's law to another.

---

# 45. SOURCE FOR HEALTH

Health-related content requires high evidence standards.

Prefer:

- official health institutions;
- peer-reviewed studies;
- systematic reviews;
- recognized medical references.

Do not treat anecdotal claims as equivalent to clinical evidence.

---

# 46. SOURCE FOR POLITICS

Political or public-policy claims should be sourced carefully.

Prefer:

- government documents;
- official records;
- legislation;
- court documents;
- verified public statements;
- high-quality reporting;
- reputable research.

Distinguish:

Fact
Claim
Interpretation
Opinion
Prediction

Do not present one category as another.

---

# 47. SOURCE FOR STATISTICS

For every important statistic, record:

```text
source
measurement
population
time period
method where relevant
```

A statistic without context can be misleading.

Do not preserve only the number.

Preserve what the number actually measures.

---

# 48. SOURCE FOR QUOTATIONS

Before using a quotation:

Verify:

- exact wording;
- speaker/author;
- date;
- original source;
- surrounding context.

Never create a quotation from a paraphrase.

Never attribute a quotation to a person without verification.

---

# 49. SOURCE FOR VISUAL MATERIAL

Visual assets may also need source records.

Track:

```yaml
asset_source_id:
asset_type:
original_creator:
source_url:
license:
usage_rights:
date_accessed:
```

Do not assume that a publicly visible image is automatically free to reuse.

---

# 50. SOURCE LICENSE

Where relevant, record:

- copyright status;
- license;
- attribution requirement;
- commercial use status;
- modification rights.

When licensing is unclear, do not assume permission.

---

# 51. SOURCE ACCESS

Record whether the source is:

```text
PUBLIC
PAYWALLED
LOGIN_REQUIRED
ARCHIVED
LOCAL_FILE
RESTRICTED
```

A paywalled source may still be useful for research.

However, the final evidence trail should remain as accessible and traceable as practical.

---

# 52. SOURCE ACCESS FAILURE

If a source becomes inaccessible:

1. Check whether an archived version exists.
2. Search for the original document elsewhere.
3. Replace it with a stronger accessible source where possible.
4. Preserve the historical source record.
5. Do not pretend the missing source is still accessible.

---

# 53. SOURCE DUPLICATION

Before adding a new source:

Check:

- exact URL;
- title;
- DOI;
- author;
- publication;
- document identifier.

If the source already exists:

Reuse the existing Source ID.

Do not create duplicate source records.

---

# 54. SOURCE MERGING

If duplicate source records are discovered:

1. Verify that they refer to the same source.
2. Select one canonical Source ID.
3. Merge useful metadata.
4. Redirect relationships.
5. Preserve history where necessary.
6. mark the duplicate as merged/obsolete.

---

# 55. SOURCE INDEX SEARCH

The source system should eventually support searching by:

- source ID;
- title;
- author;
- publisher;
- topic;
- URL;
- DOI;
- source type;
- publication date;
- claim;
- video;
- article.

---

# 56. AI SOURCE RETRIEVAL

Before researching a new video, the AI should search existing sources.

Process:

NEW QUESTION
→ SEARCH SOURCE INDEX
→ FIND EXISTING SOURCES
→ CHECK RELEVANCE
→ REUSE STRONG SOURCES
→ IDENTIFY MISSING EVIDENCE
→ RESEARCH ONLY WHAT IS MISSING

This reduces duplicated research.

---

# 57. AI SOURCE VERIFICATION

When AI finds a source:

1. Identify the actual source.
2. Read or inspect the relevant information.
3. Determine what it supports.
4. Classify the source type.
5. Record limitations.
6. Connect it to the relevant claim.

Do not let AI infer that a source supports a claim without checking the underlying content.

---

# 58. AI SOURCE RULE

Never invent:

- source URLs;
- paper titles;
- authors;
- DOIs;
- publication dates;
- study findings;
- quotations;
- official statements.

If the source cannot be verified:

Mark it unverified.

Do not cite it as confirmed evidence.

---

# 59. SOURCE CONFIDENCE

Optional metadata may include:

```yaml
confidence:
```

However:

A confidence score never replaces evidence.

The real evidence remains:

Source quality
+
Direct support
+
Independent verification

---

# 60. INDEPENDENT VERIFICATION

For important claims, use more than one source when practical.

Example:

```text
Primary Source
+
Independent High-Quality Reporting
```

or:

```text
Official Data
+
Peer-Reviewed Research
```

Independent verification is especially useful for:

- controversial claims;
- important numbers;
- allegations;
- current events;
- high-impact claims.

---

# 61. SOURCE RECENCY

Recency matters when information can change.

High-recency priority:

- current events;
- laws;
- software;
- technology specifications;
- company information;
- active policies;
- market data.

Lower-recency sensitivity:

- historical events;
- established physical laws;
- old foundational mathematics.

Do not automatically reject old sources.

Evaluate whether the information itself is time-sensitive.

---

# 62. SOURCE STABILITY

Prefer sources that are:

- authoritative;
- persistent;
- identifiable;
- directly accessible;
- clearly dated.

For important evidence, archival preservation is recommended where practical.

---

# 63. SOURCE INDEX EXAMPLE

Example:

```yaml
source_id: source-0042

title: Example Technical Documentation

source_type: TECHNICAL_DOCUMENTATION

author: Example Engineering Team
publisher: Example Organization
institution: Example Organization

url: https://example.com/documentation
doi:

publication_date: 2026-01-10
access_date: 2026-10-06
last_verified: 2026-10-06

topic:
  - electronics
  - sensors

keywords:
  - image sensor
  - CMOS

summary:
Technical documentation describing the operating characteristics of the image sensor.

claims_supported:
  - claim-0011
  - claim-0012

reliability_notes:
First-party technical documentation.

limitations:
Applies to the specified device generation only.

used_by_videos:
  - video-0041

used_by_articles:
  - article-0041

used_by_claims:
  - claim-0011
  - claim-0012

status: ACTIVE
```

---

# 64. SOURCE-TO-CLAIM MODEL

Recommended structure:

```text
SOURCE
↓
SUPPORTS
↓
CLAIM
↓
USED_IN
↓
VIDEO
```

Example:

```text
source-0042
↓
supports
↓
claim-0011
↓
used in
↓
video-0041
```

This provides evidence traceability.

---

# 65. SOURCE-TO-ARTICLE MODEL

Recommended structure:

```text
SOURCE
↓
SUPPORTS
↓
CLAIM
↓
USED_IN
↓
ARTICLE
```

The same source may support both video and article content.

---

# 66. SOURCE COLLECTION

A research project may contain a source collection:

```text
Research Project
├── Primary Sources
├── Official Sources
├── Research Papers
├── Reporting
├── Background Sources
└── Rejected Sources
```

This makes research easier to audit.

---

# 67. RESEARCH PACKAGE SOURCES

Every major video research package should preserve:

```text
Core Sources
Supporting Sources
Context Sources
Conflicting Sources
Rejected Sources
```

This is more useful than keeping only a final citation list.

---

# 68. REJECTED SOURCE LOG

When a source looked useful but was rejected, record why when practical.

Example:

```yaml
source_id: source-0099

status: REJECTED

reason:
Secondary article repeated an unsupported claim without citing primary evidence.
```

This prevents the same weak source from being rediscovered repeatedly.

---

# 69. SOURCE MAINTENANCE

Periodically check:

- broken URLs;
- outdated information;
- duplicate sources;
- incorrect metadata;
- superseded studies;
- updated official documents;
- archive availability.

Do not require every source to be rechecked constantly.

Prioritize important and time-sensitive sources.

---

# 70. SOURCE INDEX AND KNOWLEDGE GRAPH

Each Source can become a graph node.

Example:

```text
SOURCE
→ SUPPORTS
→ CLAIM

SOURCE
→ EXPLAINS
→ CONCEPT

SOURCE
→ DOCUMENTS
→ EVENT

SOURCE
→ USED_BY
→ VIDEO
```

The Sources Index stores source records.

The Knowledge Graph stores source relationships.

---

# 71. SOURCE INDEX AND VIDEO INDEX

The Video Index records:

Which sources a video uses.

The Sources Index records:

Which videos use a source.

This creates a two-way relationship.

---

# 72. SOURCE INDEX AND ARTICLE SYSTEM

Articles should reference the same canonical source records used by videos where applicable.

Avoid creating separate source identities for the same underlying evidence.

---

# 73. SOURCE UPDATE RULE

When a stronger source replaces an older one:

```text
NEW SOURCE
→ SUPERSEDES
→ OLD SOURCE
```

Update affected claims and content records where necessary.

Do not silently erase the older source.

---

# 74. SOURCE CORRECTION RULE

If a source is discovered to contain an important error:

1. Verify the issue.
2. Identify affected claims.
3. identify affected videos/articles.
4. Find replacement evidence.
5. update the relevant content.
6. preserve the source history.

---

# 75. SOURCE TRACEABILITY TEST

For every major factual statement, the system should ideally answer:

What source supports this?

What exactly does the source support?

How strong is the evidence?

Is the information current?

Was the source independently verified?

If these cannot be answered for an important claim, research may be incomplete.

---

# 76. SOURCE QUALITY TEST

A source is stronger when:

- authority is appropriate;
- evidence is direct;
- methodology is sound;
- information is relevant;
- date is appropriate;
- limitations are understood;
- source identity is clear.

A source is weaker when:

- evidence is indirect;
- origin is unclear;
- claims are repeated without evidence;
- information is outdated;
- methodology is unknown;
- citations are circular.

---

# 77. GOLDEN SOURCE RULE

Do not ask:

"Can I find a source?"

Ask:

"Can I find the strongest appropriate source for this exact claim?"

---

# 78. FINAL SOURCE PRINCIPLE

Curious Reality should build a source archive that makes every important piece of knowledge traceable.

Research should not disappear after publication.

Sources should become reusable infrastructure for future:

- videos;
- articles;
- questions;
- claims;
- corrections;
- investigations;
- knowledge graph relationships;
- AI systems.

---

# 79. CANONICAL SOURCE STATEMENT

The Curious Reality Sources Index is a structured registry of the evidence used to build the brand's research, claims, videos, articles, and long-term knowledge archive.

---

# 80. ONE-LINE SOURCE RULE

Do not collect sources to look researched.

Collect evidence that actually supports what you are saying.

---

# END OF SOURCES INDEX
```