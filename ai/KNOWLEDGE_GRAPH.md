```md
# CURIOUS REALITY — KNOWLEDGE GRAPH

## STATUS

Document Type: Knowledge Graph Architecture, Entity Model & Relationship System
Brand: Curious Reality
Authority: Derived from CURIOUS_REALITY_MASTER_ARCHITECTURE.md

Purpose:

Define how Curious Reality connects questions, topics, videos, articles, sources, concepts, people, systems, technologies, historical events, and future research into one structured knowledge network.

The Knowledge Graph is intended to transform the archive from a collection of isolated content items into an interconnected body of knowledge.

The Master Architecture remains the highest-level source of truth.

---

# 1. KNOWLEDGE GRAPH PURPOSE

A Curious Reality video should never exist only as:

ONE VIDEO

It should exist as a connected knowledge asset.

The conceptual model is:

QUESTION
↕
TOPIC
↕
VIDEO
↕
ARTICLE
↕
SOURCE
↕
RELATED QUESTION
↕
RELATED TOPIC
↕
CONCEPT
↕
REAL-WORLD SYSTEM

The graph allows one piece of research to create many future paths.

---

# 2. CORE KNOWLEDGE PRINCIPLE

The website may look simple.

The underlying knowledge system should be structured.

Core principle:

SIMPLE PUBLIC INTERFACE
+
STRUCTURED INTERNAL KNOWLEDGE
+
MACHINE-READABLE RELATIONSHIPS

The viewer should not need to understand the graph.

The AI and future systems should.

---

# 3. WHAT IS A KNOWLEDGE GRAPH?

A knowledge graph represents:

ENTITIES

and the:

RELATIONSHIPS

between those entities.

Example:

```text
Question:
How does a smartphone camera capture an image?

        ↓ answers

Video:
How Smartphone Cameras Work

        ↓ explains

Concept:
Image Sensor

        ↓ part of

System:
Smartphone Camera

        ↓ depends on

Concept:
Light

        ↓ explained by

Topic:
Optics
```

This is different from a flat list of videos.

---

# 4. PRIMARY ENTITY TYPES

The Curious Reality graph should support at least these entity types:

1. BRAND
2. CHANNEL
3. VIDEO
4. ARTICLE
5. QUESTION
6. TOPIC
7. CONCEPT
8. SYSTEM
9. TECHNOLOGY
10. DEVICE
11. MATERIAL
12. PERSON
13. ORGANIZATION
14. EVENT
15. PLACE
16. CLAIM
17. SOURCE
18. STUDY
19. PAPER
20. MISCONCEPTION
21. EXAMPLE
22. PROCESS
23. MECHANISM
24. LANGUAGE
25. COLLECTION

The system may introduce new entity types when the archive requires them.

---

# 5. ENTITY: BRAND

Canonical:

```text
Curious Reality
```

Properties may include:

```text
name
tagline
description
website
youtube_channel
primary_language
secondary_language
```

The brand is the top-level identity of the ecosystem.

---

# 6. ENTITY: CHANNEL

Canonical:

```text
Curious Reality
```

Properties:

```text
name
platform
handle
url
language
content_types
```

Relationship:

```text
BRAND
→ HAS_CHANNEL
→ CHANNEL
```

---

# 7. ENTITY: VIDEO

Each video is a first-class graph entity.

Properties may include:

```text
video_id
youtube_video_id
title
type
status
language
publication_date
youtube_url
website_url
slug
summary
core_question
primary_topic
secondary_topics
```

A Video entity should connect to its:

- question;
- topics;
- article;
- sources;
- related videos;
- language versions;
- thumbnail;
- concepts;
- mechanisms;
- follow-up questions.

---

# 8. ENTITY: ARTICLE

An article is the deeper written explanation associated with a video or topic.

Properties:

```text
article_id
video_id
title
slug
summary
status
language
path
publication_date
last_updated
```

Primary relationship:

```text
VIDEO
→ HAS_ARTICLE
→ ARTICLE
```

An article may also exist independently when appropriate.

---

# 9. ENTITY: QUESTION

Questions are fundamental entities in the Curious Reality graph.

A question represents the curiosity that drives research.

Properties:

```text
question_id
question_text
status
topic
difficulty
question_type
created_date
related_video_ids
related_topic_ids
```

Possible question types:

```text
WHY
HOW
WHAT
WHERE
WHEN
WHAT_IF
IS_IT_TRUE
WHAT_IS_ACTUALLY_HAPPENING
WHY_DO_WE_MISUNDERSTAND_THIS
```

---

# 10. QUESTION AS A GRAPH NODE

A question may connect to:

```text
QUESTION
→ ANSWERED_BY
→ VIDEO

QUESTION
→ EXPLAINED_BY
→ ARTICLE

QUESTION
→ RELATES_TO
→ TOPIC

QUESTION
→ FOLLOWED_BY
→ QUESTION

QUESTION
→ SUPPORTED_BY
→ SOURCE
```

A question can therefore exist before a video.

It may later become:

- a Short;
- a long-form video;
- an article;
- a visual explanation;
- a research project.

---

# 11. ENTITY: TOPIC

Topics are broad knowledge categories.

Examples:

```text
Science
Physics
Technology
Electronics
Computers
Artificial Intelligence
Psychology
History
Space
Engineering
Internet
Energy
```

Properties:

```text
topic_id
name
description
parent_topic
related_topics
content_count
status
```

Topics are organizational structures.

They are not the ultimate brand identity.

The question remains more important than the category.

---

# 12. TOPIC HIERARCHY

Topics may have parent-child relationships.

Example:

```text
Science
└── Physics
    ├── Mechanics
    ├── Optics
    ├── Thermodynamics
    └── Electromagnetism
```

Another example:

```text
Technology
├── Computers
├── Smartphones
├── Networks
└── Artificial Intelligence
```

The hierarchy should remain flexible.

Do not create deeply nested categories merely for organization.

---

# 13. ENTITY: CONCEPT

A Concept represents a specific idea that may appear across multiple videos.

Examples:

```text
Gravity
Electric Current
Neural Network
Image Sensor
Inflation
Memory
Entropy
Probability
```

Properties:

```text
concept_id
name
definition
topic
related_concepts
```

A concept can connect dozens of videos.

This allows the archive to become cumulative.

---

# 14. ENTITY: SYSTEM

A System represents a functioning collection of interacting components.

Examples:

```text
Internet
Power Grid
Smartphone Camera System
Human Circulatory System
Search Engine
Payment Network
```

Properties:

```text
system_id
name
description
components
dependencies
environment
```

Systems should connect to their components and mechanisms.

---

# 15. ENTITY: TECHNOLOGY

Technology entities represent technologies or technical methods.

Examples:

```text
Lithium-ion Battery
Fiber Optics
Bluetooth
Machine Learning
GPS
Semiconductor Manufacturing
```

A technology may connect to:

- devices;
- systems;
- concepts;
- processes;
- videos;
- historical events.

---

# 16. ENTITY: DEVICE

A Device represents a physical object or engineered product.

Examples:

```text
Smartphone
Camera
Transistor
Electric Motor
Router
Aircraft
```

A device may:

```text
USES
CONTAINS
DEPENDS_ON
IMPLEMENTS
MEASURES
PRODUCES
RECEIVES
```

other entities.

---

# 17. ENTITY: MATERIAL

Material entities represent substances or engineered materials.

Examples:

```text
Silicon
Copper
Glass
Steel
Plastic
Ceramic
Lithium
```

Materials may connect to:

```text
DEVICE
→ MADE_OF
→ MATERIAL
```

or:

```text
MATERIAL
→ ENABLES
→ TECHNOLOGY
```

---

# 18. ENTITY: PERSON

A Person entity may represent a historically or scientifically relevant individual.

Examples of uses:

- inventor;
- scientist;
- engineer;
- historical figure;
- researcher;
- public figure relevant to a documented event.

Properties may include:

```text
person_id
name
role
field
time_period
```

Only create a Person node when the person is materially relevant to the content.

Do not populate the graph with irrelevant people.

---

# 19. ENTITY: ORGANIZATION

Organizations may include:

- research institutions;
- governments;
- universities;
- companies;
- international organizations;
- museums;
- scientific institutions;
- standards bodies.

Properties:

```text
organization_id
name
type
location
website
```

Organizations may publish sources or participate in events.

---

# 20. ENTITY: EVENT

Events represent specific historical, scientific, technological, social, or other meaningful occurrences.

Properties:

```text
event_id
name
date
location
description
participants
sources
```

Possible relationships:

```text
EVENT
→ OCCURRED_AT
→ PLACE

EVENT
→ INVOLVED
→ PERSON

EVENT
→ DOCUMENTED_BY
→ SOURCE

EVENT
→ EXPLAINED_BY
→ VIDEO
```

---

# 21. ENTITY: PLACE

Places represent geographically meaningful locations.

Examples:

```text
Bangladesh
Dhaka
Pacific Ocean
Mars
Lunar Orbit
Silicon Valley
```

Only create geographic entities when location materially matters.

---

# 22. ENTITY: CLAIM

A Claim is a specific factual proposition.

Example:

```text
Claim:
The device converts electrical energy into mechanical motion.
```

Properties:

```text
claim_id
claim_text
status
confidence
source_ids
related_video_ids
```

Possible statuses:

```text
ESTABLISHED
SUPPORTED
CONTESTED
UNCERTAIN
SPECULATIVE
```

This allows the knowledge system to separate facts from interpretation.

---

# 23. CLAIM-SOURCE RELATIONSHIP

A source may support one or more claims.

Example:

```text
SOURCE
→ SUPPORTS
→ CLAIM
```

A claim may also have multiple supporting sources:

```text
CLAIM
→ SUPPORTED_BY
→ SOURCE A
→ SOURCE B
→ SOURCE C
```

This is important for fact-checking.

---

# 24. ENTITY: SOURCE

A Source represents material used to support knowledge.

Possible source types:

```text
PRIMARY_DOCUMENT
OFFICIAL_SOURCE
RESEARCH_PAPER
PEER_REVIEWED_STUDY
BOOK
HIGH_QUALITY_REPORTING
SECONDARY_EXPLAINER
DATASET
ARCHIVE
```

Properties:

```text
source_id
title
url
source_type
publisher
author
publication_date
access_date
relevance
```

---

# 25. ENTITY: STUDY

A Study represents a specific scientific or research study.

Properties:

```text
study_id
title
authors
institution
publication_date
method
result
limitations
source_url
```

A study may support one or more claims.

The graph should preserve limitations where they materially affect interpretation.

---

# 26. ENTITY: PAPER

A Paper may represent a formally published research paper.

Relationships:

```text
PAPER
→ AUTHORED_BY
→ PERSON

PAPER
→ PUBLISHED_BY
→ ORGANIZATION

PAPER
→ SUPPORTS
→ CLAIM

PAPER
→ DISCUSSES
→ CONCEPT
```

---

# 27. ENTITY: MISCONCEPTION

A Misconception represents a commonly held but incorrect or incomplete understanding.

Properties:

```text
misconception_id
statement
correction
related_topic
related_question
```

Relationship:

```text
VIDEO
→ CORRECTS
→ MISCONCEPTION
```

The purpose is educational clarification, not mocking the audience.

---

# 28. ENTITY: EXAMPLE

An Example represents a real-world case used to explain a concept.

Properties:

```text
example_id
name
description
context
related_concept
source
```

Relationship:

```text
CONCEPT
→ ILLUSTRATED_BY
→ EXAMPLE
```

Examples help bridge abstract knowledge to reality.

---

# 29. ENTITY: PROCESS

A Process represents an ordered transformation.

Examples:

```text
Image Capture
Data Compression
Battery Charging
Search Request
Manufacturing Process
```

A process may contain steps.

Example:

```text
ACTION
→ PRODUCES
→ SIGNAL

SIGNAL
→ PROCESSED_BY
→ COMPONENT

COMPONENT
→ PRODUCES
→ OUTPUT
```

---

# 30. ENTITY: MECHANISM

A Mechanism represents the underlying cause or operation that explains how something works.

This is especially important for Curious Reality.

Example:

```text
Question:
Why does X happen?

        ↓

Mechanism:
Y causes X because...
```

Properties:

```text
mechanism_id
name
description
inputs
process
outputs
conditions
```

---

# 31. ENTITY: LANGUAGE

Languages may be represented as entities.

Canonical:

```text
English
Bangla
```

A video can connect to:

```text
VIDEO
→ WRITTEN_IN
→ LANGUAGE
```

A localized version can connect to the original:

```text
BANGLA_VIDEO
→ LOCALIZED_VERSION_OF
→ ENGLISH_VIDEO
```

---

# 32. ENTITY: COLLECTION

A Collection groups related content.

Examples:

```text
How Computers Work
Hidden Systems
Everyday Mysteries
Unexpected Physics
AI Explained
Human Body
```

Properties:

```text
collection_id
name
description
theme
members
```

Collections are useful for:

- website navigation;
- curated browsing;
- playlists;
- future editorial projects.

---

# 33. CORE RELATIONSHIP TYPES

The graph should support at least:

```text
ANSWERS
EXPLAINS
RELATED_TO
PART_OF
CONTAINS
DEPENDS_ON
CAUSES
LEADS_TO
USED_BY
IMPLEMENTS
BUILT_FROM
MADE_OF
MEASURES
PRODUCES
RECEIVES
COMPARES_WITH
CONTRASTS_WITH
FOLLOW_UP_TO
DEEPER_DIVE_OF
EXPANDS
UPDATES
CORRECTS
SUPPORTS
SUPPORTED_BY
CITED_BY
DOCUMENTED_BY
LOCATED_IN
OCCURRED_AT
INVOLVES
AUTHORED_BY
PUBLISHED_BY
ILLUSTRATED_BY
LOCALIZED_VERSION_OF
INSPIRED_BY
MISCONCEPTION_OF
```

Only use a relationship when it is semantically accurate.

---

# 34. RELATIONSHIP DIRECTION

Relationships should preserve direction where direction matters.

Example:

Correct:

```text
SOURCE
→ SUPPORTS
→ CLAIM
```

Different meaning:

```text
CLAIM
→ SUPPORTED_BY
→ SOURCE
```

Both may be useful representations, but they should not be treated as interchangeable labels unless the data model explicitly maps them.

---

# 35. VIDEO RELATIONSHIPS

A Video can connect to:

```text
VIDEO
→ ANSWERS
→ QUESTION

VIDEO
→ ABOUT
→ TOPIC

VIDEO
→ EXPLAINS
→ CONCEPT

VIDEO
→ EXPLAINS
→ MECHANISM

VIDEO
→ CITES
→ SOURCE

VIDEO
→ HAS_ARTICLE
→ ARTICLE

VIDEO
→ RELATED_TO
→ VIDEO

VIDEO
→ FOLLOW_UP_TO
→ VIDEO

VIDEO
→ CORRECTS
→ MISCONCEPTION

VIDEO
→ USES
→ EXAMPLE

VIDEO
→ IN_LANGUAGE
→ LANGUAGE
```

---

# 36. ARTICLE RELATIONSHIPS

An Article can connect to:

```text
ARTICLE
→ EXPANDS
→ VIDEO

ARTICLE
→ EXPLAINS
→ CONCEPT

ARTICLE
→ ANSWERS
→ QUESTION

ARTICLE
→ CITES
→ SOURCE

ARTICLE
→ RELATED_TO
→ ARTICLE
```

The article should add knowledge, not merely copy the video description.

---

# 37. QUESTION RELATIONSHIPS

A Question may connect to:

```text
QUESTION
→ ANSWERED_BY
→ VIDEO

QUESTION
→ EXPLAINED_BY
→ ARTICLE

QUESTION
→ ABOUT
→ TOPIC

QUESTION
→ INVOLVES
→ CONCEPT

QUESTION
→ FOLLOWED_BY
→ QUESTION

QUESTION
→ RELATED_TO
→ QUESTION

QUESTION
→ SUPPORTED_BY
→ SOURCE
```

---

# 38. TOPIC RELATIONSHIPS

Topics can connect through:

```text
TOPIC
→ PART_OF
→ TOPIC

TOPIC
→ RELATED_TO
→ TOPIC

TOPIC
→ INTERSECTS_WITH
→ TOPIC

TOPIC
→ CONTAINS
→ CONCEPT

TOPIC
→ CONTAINS
→ QUESTION
```

---

# 39. CONCEPT RELATIONSHIPS

Concepts can connect through:

```text
CONCEPT
→ PART_OF
→ CONCEPT

CONCEPT
→ DEPENDS_ON
→ CONCEPT

CONCEPT
→ CAUSES
→ CONCEPT

CONCEPT
→ RELATED_TO
→ CONCEPT

CONCEPT
→ EXPLAINS
→ PHENOMENON

CONCEPT
→ USED_BY
→ SYSTEM
```

---

# 40. SYSTEM RELATIONSHIPS

Systems may connect to:

```text
SYSTEM
→ CONTAINS
→ COMPONENT

SYSTEM
→ DEPENDS_ON
→ SYSTEM

SYSTEM
→ IMPLEMENTS
→ TECHNOLOGY

SYSTEM
→ USES
→ PROCESS

SYSTEM
→ PRODUCES
→ OUTPUT
```

This allows complex real-world systems to be represented accurately.

---

# 41. SOURCE RELATIONSHIPS

Sources may:

```text
SOURCE
→ SUPPORT
→ CLAIM

SOURCE
→ DOCUMENT
→ EVENT

SOURCE
→ DESCRIBE
→ CONCEPT

SOURCE
→ PUBLISH
→ STUDY

SOURCE
→ CITE
→ PAPER
```

Sources should never be connected simply because they mention the same keyword.

The relationship must be meaningful.

---

# 42. KNOWLEDGE PATHS

The graph should allow paths such as:

```text
QUESTION
→ VIDEO
→ CONCEPT
→ RELATED_CONCEPT
→ TOPIC
```

or:

```text
VIDEO
→ CLAIM
→ SOURCE
→ STUDY
→ CONCEPT
```

or:

```text
VIDEO
→ TOPIC
→ RELATED_TOPIC
→ RELATED_VIDEO
→ FOLLOW_UP_QUESTION
```

These paths can later power discovery and recommendations.

---

# 43. EXAMPLE GRAPH

Example:

```text
QUESTION:
Why does a smartphone camera need an image sensor?

        ↓ ANSWERED_BY

VIDEO:
How Smartphone Cameras Work

        ↓ EXPLAINS

MECHANISM:
Light-to-electrical-signal conversion

        ↓ USES

CONCEPT:
Photodiode

        ↓ PART_OF

TECHNOLOGY:
CMOS Image Sensor

        ↓ USED_BY

DEVICE:
Smartphone Camera

        ↓ RELATED_TO

TOPIC:
Electronics

        ↓ SUPPORTED_BY

SOURCE:
Technical Documentation
```

This is the intended style of reasoning.

---

# 44. INTERDISCIPLINARY GRAPH

The graph should actively represent intersections.

Example:

```text
AI
↕
Computer Science
↕
Neural Networks
↕
Human Brain
↕
Psychology
```

Another:

```text
Battery
↕
Electrochemistry
↕
Materials
↕
Electrical Engineering
↕
Energy Storage
```

The strongest questions may exist at these intersections.

---

# 45. QUESTION CLUSTER GRAPH

A single question can produce a cluster.

Example:

```text
QUESTION:
How does a website load?

        ↓

FOLLOW-UP:
Where does the request go?

        ↓

FOLLOW-UP:
How does DNS find the server?

        ↓

FOLLOW-UP:
How does the server send the page?

        ↓

FOLLOW-UP:
How does the browser turn data into pixels?
```

Each question can become an individual content asset.

---

# 46. VIDEO CLUSTER GRAPH

Example:

```text
VIDEO A
How Does the Internet Work?

        ↓

VIDEO B
What Happens When You Open a Website?

        ↓

VIDEO C
How Does DNS Actually Work?

        ↓

VIDEO D
Where Is a Website Stored?

        ↓

VIDEO E
How Does a Browser Render a Page?
```

The videos form a connected educational pathway.

---

# 47. KNOWLEDGE DEPTH

The graph should support increasing depth:

LEVEL 1
Observation

LEVEL 2
Simple Explanation

LEVEL 3
Mechanism

LEVEL 4
Deep Structure

LEVEL 5
Cross-Topic Connection

LEVEL 6
Broader Implication

A viewer may enter at any level.

The archive should allow movement deeper without losing context.

---

# 48. KNOWLEDGE GRAPH AND SHORTS

Shorts may represent one graph edge or one compact concept.

Example:

```text
Question
→ Short
→ Mechanism
```

The Short does not need to explain the entire graph.

It provides an accessible entry point.

---

# 49. KNOWLEDGE GRAPH AND LONG-FORM

Long-form may traverse multiple graph nodes.

Example:

```text
Question
→ History
→ Technology
→ Mechanism
→ Evidence
→ Modern System
→ Implication
```

This makes long-form appropriate for complex investigations.

---

# 50. KNOWLEDGE GRAPH AND WEBSITE

The website can use graph relationships to generate:

- related videos;
- related questions;
- topic pages;
- collections;
- article recommendations;
- source lists;
- deeper explanation paths.

The public interface should remain simple.

The graph complexity should remain behind the experience.

---

# 51. KNOWLEDGE GRAPH AND AI

AI systems can use the graph to:

- retrieve related content;
- avoid duplicate topics;
- generate follow-up questions;
- identify content gaps;
- understand previous explanations;
- connect research;
- build article outlines;
- suggest long-form expansions;
- identify conflicting claims;
- discover interdisciplinary opportunities.

The graph becomes a memory structure for Curious Reality.

---

# 52. AI RETRIEVAL PRINCIPLE

When AI receives a new question, it should search the graph before generating a completely new answer.

Process:

NEW QUESTION
→ SEARCH EXISTING GRAPH
→ FIND RELATED ENTITIES
→ FIND EXISTING KNOWLEDGE
→ IDENTIFY GAPS
→ RESEARCH ONLY WHAT IS MISSING
→ PRODUCE NEW CONTENT

This reduces repeated research.

---

# 53. DUPLICATE DETECTION

Before proposing a new video:

1. Search exact question.
2. Search semantically similar questions.
3. Search related concepts.
4. Search topic cluster.
5. Search existing videos.
6. Search follow-up relationships.

If the same question is already answered, do not recreate it unless the new content adds meaningful value.

---

# 54. GRAPH INTEGRITY

Never create relationships merely to increase graph density.

Bad:

```text
VIDEO A
→ RELATED_TO
→ VIDEO B
```

when the videos have no meaningful conceptual relationship.

Good:

```text
VIDEO A
→ EXPLAINS
→ CONCEPT X

VIDEO B
→ DEPENDS_ON
→ CONCEPT X
```

The graph should represent real semantic relationships.

---

# 55. EVIDENCE INTEGRITY

Knowledge graph relationships involving factual claims should preserve evidence.

For important claims:

```text
CLAIM
→ SUPPORTED_BY
→ SOURCE
```

Where evidence is uncertain:

```text
CLAIM
status: UNCERTAIN
```

Do not encode uncertain information as established fact.

---

# 56. TEMPORAL KNOWLEDGE

Some knowledge changes over time.

Examples:

- technology specifications;
- software versions;
- company information;
- current policies;
- scientific understanding;
- market information;
- active events.

The graph should support:

```text
created_at
valid_from
valid_until
last_verified
```

where necessary.

Older knowledge should not automatically be treated as current.

---

# 57. VERSIONING

When a concept, claim, article, or video is materially updated:

Preserve the previous relationship where historically useful.

Create an explicit relationship:

```text
NEW_RECORD
→ UPDATES
→ OLD_RECORD
```

or:

```text
VIDEO
→ CORRECTS
→ PREVIOUS_VIDEO
```

Do not silently erase meaningful history.

---

# 58. CORRECTION GRAPH

A correction can be represented as:

```text
OLD CLAIM
→ CORRECTED_BY
→ NEW CLAIM

OLD VIDEO
→ CORRECTED_BY
→ NEW VIDEO

OLD ARTICLE
→ UPDATED_BY
→ NEW ARTICLE
```

The exact relationship labels may be normalized by the implementation.

---

# 59. LANGUAGE GRAPH

Language versions should remain connected.

Example:

```text
ENGLISH VIDEO
→ LOCALIZED_VERSION_OF
→ BANGLA VIDEO
```

Both can connect to the same:

- Question;
- Topic;
- Concept;
- Research;
- Sources.

This avoids duplicating the entire underlying knowledge graph.

---

# 60. SOURCE REUSE

A single reliable source may support multiple content assets.

Example:

```text
SOURCE
├── SUPPORTS → CLAIM A
├── SUPPORTS → CLAIM B
├── DOCUMENTS → EVENT
└── EXPLAINS → CONCEPT
```

This allows research to compound.

---

# 61. GRAPH-BASED CONTENT REUSE

A single concept can become:

```text
CONCEPT
↓
Short
↓
Long-form
↓
Article
↓
Question
↓
Diagram
↓
Follow-up
↓
Related Topic
```

The graph should make these opportunities visible.

---

# 62. CONTENT GAP DETECTION

The graph can reveal:

- topics with no videos;
- questions with no answers;
- concepts mentioned without explanation;
- videos lacking sources;
- isolated content clusters;
- missing follow-ups;
- missing articles;
- disconnected topics;
- heavily covered topics with weak depth.

These gaps can become research opportunities.

---

# 63. ORPHAN NODE DETECTION

An orphan entity is an entity with no meaningful relationship to the rest of the graph.

Examples:

- source with no supported claim;
- concept with no video/article;
- question with no answer;
- video with no topic;
- topic with no content.

AI or maintenance processes should identify orphan nodes.

Not every node must immediately have many relationships.

New ideas can legitimately begin isolated.

---

# 64. GRAPH MATURITY

A knowledge item may move through:

```text
UNEXPLORED
→ DISCOVERED
→ RESEARCHED
→ VERIFIED
→ PUBLISHED
→ CONNECTED
→ EXPANDED
→ ARCHIVED
```

The graph becomes more valuable as relationships accumulate.

---

# 65. GRAPH QUALITY RULES

The graph should prioritize:

Accuracy
Clarity
Semantic correctness
Evidence
Consistency
Reusability
Traceability

It should not prioritize:

Maximum node count
Maximum edge count
Complexity for its own sake
Artificial relationships

---

# 66. MACHINE-READABLE REPRESENTATION

The long-term graph may be represented in:

JSON

or:

```text
JSON-LD
RDF
Graph database
Relational database
Knowledge APIs
```

The implementation may change.

The conceptual entity and relationship model should remain stable.

---

# 67. POSSIBLE JSON STRUCTURE

Example:

```json
{
  "id": "question-001",
  "type": "question",
  "name": "How does a website load?",
  "relations": [
    {
      "type": "ANSWERED_BY",
      "target": "video-001"
    },
    {
      "type": "ABOUT",
      "target": "topic-internet"
    },
    {
      "type": "INVOLVES",
      "target": "concept-dns"
    }
  ]
}
```

This is an example representation, not a mandatory final implementation format.

---

# 68. ENTITY ID RULE

Every graph entity should have a stable identifier.

Example:

```text
question-001
topic-internet
concept-dns
video-5vld4m
source-001
```

IDs should be:

- unique;
- stable;
- machine-readable;
- independent of display text.

Do not use titles as permanent primary identifiers.

---

# 69. DISPLAY NAME VS ID

Keep:

```text
ID
```

separate from:

```text
Human-readable name
```

Example:

```text
ID:
concept-dns

Name:
Domain Name System
```

The name may change.

The ID should remain stable.

---

# 70. GRAPH NORMALIZATION

Avoid creating multiple entities for the same underlying concept.

Bad:

```text
AI
Artificial Intelligence
Artificial Intelligence Technology
AI Technology
```

when they all refer to the same concept.

Prefer one canonical entity:

```text
Artificial Intelligence
```

and optional aliases.

---

# 71. ALIAS SYSTEM

Entities may contain:

```text
canonical_name
aliases
short_name
technical_name
localized_names
```

Example:

```text
Canonical:
Artificial Intelligence

Alias:
AI
```

This improves search without duplicating nodes.

---

# 72. ENTITY MERGE RULE

When two records are discovered to represent the same entity:

1. Verify identity.
2. Select one canonical entity.
3. Merge useful metadata.
4. Redirect relationships.
5. Preserve history where appropriate.
6. Remove or mark the duplicate.

Never merge based solely on similar names.

---

# 73. ENTITY SPLIT RULE

If one entity incorrectly combines multiple concepts:

1. Identify the distinct entities.
2. Create separate canonical nodes.
3. Reassign relationships.
4. Preserve historical references.
5. Update affected videos/articles.

This protects semantic accuracy.

---

# 74. GRAPH SEARCH

Future graph search should support:

Exact search

Semantic search

Related search

Question search

Topic search

Concept search

Source search

Relationship search

Example:

```text
"Why does glass break?"
```

should find:

- the exact question;
- related videos;
- materials;
- fracture concepts;
- relevant sources;
- related questions.

---

# 75. GRAPH RECOMMENDATIONS

Recommendations should use meaningful graph relationships.

Possible recommendation logic:

Current Video
→ Same Question Cluster
→ Related Concept
→ Related Topic
→ Follow-up Question
→ Deeper Video

Avoid recommending unrelated content merely because it is popular.

---

# 76. GRAPH-BASED WEBSITE NAVIGATION

Future navigation can expose:

Explore Topic
→ Questions
→ Videos
→ Articles
→ Related Concepts

This can become a major part of the long-term knowledge platform.

---

# 77. GRAPH-BASED AI QUESTION GENERATION

AI may generate new questions by traversing relationships.

Example:

```text
Concept:
Battery

↓ DEPENDS_ON

Electrochemistry

↓ RELATED_TO

Materials

↓ QUESTION

Why do some batteries lose capacity over time?
```

The AI should generate questions from meaningful graph gaps, not random combinations.

---

# 78. GRAPH-BASED RESEARCH

When researching a topic, the AI should inspect:

Existing Videos

Existing Questions

Existing Concepts

Existing Claims

Existing Sources

Related Topics

Previous Corrections

Then identify:

Known Knowledge

Known Uncertainty

Missing Knowledge

New Research Required

This makes research more efficient and consistent.

---

# 79. KNOWLEDGE CONFIDENCE

Where useful, an entity or claim may include:

```text
confidence
verified
last_verified
evidence_count
```

However:

Confidence scores must not replace actual evidence.

A numerical score is metadata.

Evidence remains the authority.

---

# 80. GRAPH GOVERNANCE

Changes to the graph should preserve:

- canonical identity;
- source traceability;
- historical relationships;
- language relationships;
- factual integrity.

Do not restructure the graph casually.

Structural changes should improve long-term utility.

---

# 81. AI GRAPH GOVERNANCE

AI must never:

- invent relationships;
- invent entities;
- merge unrelated concepts;
- assign unsupported causal relationships;
- mark speculation as fact;
- fabricate source support.

When a relationship is uncertain:

Mark it uncertain.

Or do not create it yet.

---

# 82. GRAPH AND MASTER ARCHITECTURE

The Knowledge Graph implements the Master Architecture's long-term principle:

QUESTION
→ RESEARCH
→ EXPLANATION
→ KNOWLEDGE
→ DISTRIBUTION

The graph makes:

QUESTION

and:

KNOWLEDGE

persistent and interconnected.

---

# 83. GRAPH AND VIDEO INDEX

The Video Index tracks individual videos.

The Knowledge Graph connects those videos to the wider knowledge ecosystem.

Relationship:

```text
VIDEO INDEX
→ VIDEO RECORDS

KNOWLEDGE GRAPH
→ RELATIONSHIPS AROUND VIDEO RECORDS
```

The two systems should complement each other.

---

# 84. GRAPH AND QUESTION ARCHIVE

The Question Archive stores questions.

The Knowledge Graph connects questions to:

- topics;
- concepts;
- videos;
- sources;
- related questions.

Therefore:

QUESTION ARCHIVE
= Question Registry

KNOWLEDGE GRAPH
= Question Relationships

---

# 85. GRAPH AND SOURCES INDEX

The Sources Index stores source records.

The Knowledge Graph connects sources to:

- claims;
- studies;
- papers;
- videos;
- articles;
- events;
- concepts.

Therefore:

SOURCES INDEX
= Source Registry

KNOWLEDGE GRAPH
= Evidence Relationships

---

# 86. GRAPH AND SEO

Knowledge relationships can support:

- internal links;
- related content;
- breadcrumb structure;
- topic pages;
- article relationships;
- structured metadata.

SEO should use real semantic relationships.

Never create artificial links solely for search-engine manipulation.

---

# 87. GRAPH AND WEBSITE SCALE

As the archive grows:

10 videos
→ small graph

100 videos
→ connected graph

1,000 videos
→ substantial knowledge network

10,000+ videos
→ potentially large structured knowledge system

The architecture should therefore avoid assumptions that only work for a small archive.

---

# 88. GRAPH SCALABILITY

The graph implementation should support:

- thousands of videos;
- thousands of questions;
- many-to-many topic relationships;
- source reuse;
- language variants;
- historical updates;
- semantic search;
- incremental updates.

Do not create a system that requires rebuilding the entire knowledge model for every new video.

---

# 89. GRAPH UPDATE PIPELINE

When a new video is published:

```text
NEW VIDEO
↓
CREATE VIDEO NODE
↓
CREATE / LINK QUESTION
↓
LINK TOPIC
↓
LINK CONCEPTS
↓
LINK MECHANISM
↓
LINK SOURCES
↓
LINK ARTICLE
↓
LINK RELATED VIDEOS
↓
LINK FOLLOW-UP QUESTIONS
↓
UPDATE KNOWLEDGE GRAPH
```

Only create relationships that are actually supported.

---

# 90. GRAPH ARCHIVAL PIPELINE

When a video becomes archived:

```text
VIDEO
→ ARCHIVED

Then preserve:

Question
Topic
Concepts
Claims
Sources
Article
Relationships
Analytics reference
Corrections
Future opportunities
```

The archived content remains part of the graph.

---

# 91. GRAPH CHANGE LOG

Important graph changes may be logged.

Example:

```text
2026-10-06
Added concept:
Image Sensor

Connected to:
Smartphone Camera
Digital Photography
Optics

Reason:
New published video
```

This helps future maintenance.

---

# 92. GRAPH REVIEW

Periodically review for:

- duplicate entities;
- broken relationships;
- unsupported relationships;
- missing sources;
- orphan nodes;
- incorrect topic placement;
- outdated claims;
- missing follow-up questions;
- disconnected content clusters.

---

# 93. GRAPH QUALITY TEST

A healthy knowledge graph should allow a question such as:

"How does X actually work?"

to lead through:

Question
→ Video
→ Mechanism
→ Concept
→ Source
→ Related Concept
→ Related Video
→ Follow-up Question

without arbitrary or meaningless jumps.

---

# 94. GRAPH GOLDEN RULE

Every connection must mean something.

Do not build a large graph.

Build a truthful graph.

---

# 95. FINAL KNOWLEDGE PRINCIPLE

A Curious Reality video is not the final destination of research.

It is one node in a growing system of:

Questions
+
Knowledge
+
Evidence
+
Explanations
+
Relationships

Each strong piece of research should make future research easier.

---

# 96. CANONICAL GRAPH STATEMENT

Curious Reality's Knowledge Graph is a structured representation of the questions, topics, concepts, systems, claims, sources, videos, articles, and relationships that collectively form the brand's long-term knowledge archive.

---

# 97. ONE-LINE GRAPH RULE

Connect knowledge by meaning, not by coincidence.

---

# END OF KNOWLEDGE GRAPH
```