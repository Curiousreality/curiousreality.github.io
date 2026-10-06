```md
# CURIOUS REALITY — VIDEO INDEX

## STATUS

Document Type: Video Registry, Production Index & Content Archive Schema
Brand: Curious Reality
Authority: Derived from CURIOUS_REALITY_MASTER_ARCHITECTURE.md

Purpose:

Maintain a structured index of every Curious Reality video from initial idea through publication, analysis, and archival.

This file is the central human-readable registry for video-level information.

The actual production system may additionally use:

- content/videos.json
- website-generated data
- article records
- analytics data
- future database records

Those systems may contain more detailed machine-readable information.

---

# 1. VIDEO INDEX PURPOSE

The Video Index prevents Curious Reality from becoming a collection of disconnected uploads.

Every important video should have a persistent record.

The record should allow an AI or human collaborator to understand:

- what the video is about;
- which question it answers;
- what format it uses;
- where it is in production;
- where the research exists;
- where the video lives;
- what related knowledge exists;
- how it performed;
- what can be produced from it later.

---

# 2. VIDEO IDENTITY

Every video must have a unique internal Video ID.

Recommended structure:

A short stable identifier.

Example:

```text
5vld4m
```

The Video ID should not normally change after creation.

It should be treated as the permanent internal identity of the content item.

---

# 3. REQUIRED CORE FIELDS

Every video record should eventually contain:

```text
video_id
core_question
working_title
final_title
type
status
youtube_url
youtube_video_id
website_url
publication_date
language
```

Additional fields should be added as information becomes available.

---

# 4. VIDEO TYPE

Allowed primary types:

```text
short
long
```

The explicit type field is authoritative.

Do not attempt to infer the format solely from the YouTube URL.

Example:

```json
{
  "youtube_url": "https://youtu.be/VIDEO_ID",
  "type": "long",
  "status": "published"
}
```

or:

```json
{
  "youtube_url": "https://youtube.com/shorts/VIDEO_ID",
  "type": "short",
  "status": "published"
}
```

---

# 5. VIDEO STATUS

Production status should follow the standard pipeline:

```text
IDEA
SHORTLISTED
RESEARCHING
VERIFIED
SCRIPTED
VISUAL_PLAN
EDITING
REVIEW
SCHEDULED
PUBLISHED
ANALYZED
ARCHIVED
```

Status should always communicate the current production state.

Do not use vague states such as:

```text
working
almost done
maybe finished
```

Use explicit production states.

---

# 6. IDEA RECORD

At the idea stage, the minimum useful information is:

```text
video_id
core_question
working_title
topic
idea_source
initial_reason
status
```

Example:

```md
Video ID:
5vld4m

Core Question:
Why does this happen?

Working Title:
Why Does X Behave Like This?

Topic:
Physics

Idea Source:
Everyday observation

Initial Reason:
Unexpected behavior with a clear hidden mechanism

Status:
IDEA
```

---

# 7. SHORTLISTED RECORD

At the shortlisted stage, add:

```text
curiosity_strength
knowledge_payoff
visual_potential
evidence_potential
originality
audience_relevance
format_candidate
```

These are decision signals, not permanent objective scores.

The purpose is to determine whether the question deserves production.

---

# 8. RESEARCHING RECORD

Once research begins, the record should include:

```text
research_status
primary_sources
secondary_sources
key_claims
open_questions
known_uncertainties
conflicting_evidence
research_notes_location
```

Research should exist independently of the final script.

---

# 9. VERIFIED RECORD

A video may move to VERIFIED when the central factual foundation has been sufficiently checked.

Record:

```text
verification_status
verified_claims
remaining_uncertainties
source_status
verification_notes
verification_date
```

A video should not be treated as factually complete merely because a script has been written.

---

# 10. SCRIPTED RECORD

Once scripting is complete, track:

```text
script_status
script_location
hook
central_question
main_explanation
reveal
mechanism
payoff
language
script_version
```

Where multiple revisions exist, preserve version information.

Example:

```text
script_version: v3
```

---

# 11. VISUAL PLAN RECORD

Visual planning may include:

```text
visual_status
visual_concept
shot_structure
animation_requirements
diagram_requirements
source_media
generated_media
b_roll_requirements
thumbnail_concept
```

The visual plan should explain what the audience needs to see.

---

# 12. EDITING RECORD

Track:

```text
edit_status
project_location
rough_cut
final_cut
audio_status
subtitle_status
visual_status
quality_review
```

Do not mark EDITING complete until the final editorial requirements are satisfied.

---

# 13. REVIEW RECORD

Before scheduling or publishing, record:

```text
review_status
fact_check
script_check
visual_check
audio_check
title_check
thumbnail_check
policy_check
final_approval
```

The quality gate from the master architecture remains mandatory.

---

# 14. PUBLISHED RECORD

A published video should contain:

```text
video_id
final_title
type
youtube_video_id
youtube_url
website_url
publication_date
language
thumbnail
description
keywords
topics
core_question
summary
sources
status
```

The website URL should be recorded once the corresponding page exists.

---

# 15. VIDEO YOUTUBE ID

Store the actual YouTube video identifier separately.

Example:

```text
YouTube URL:
https://youtu.be/hCImaUr3JVc

YouTube Video ID:
hCImaUr3JVc
```

The Video ID and YouTube Video ID are not necessarily the same field.

Video ID:

Internal Curious Reality identifier.

YouTube Video ID:

Platform identifier.

---

# 16. WEBSITE URL

When published on the website:

```text
https://curiousreality.github.io/videos/<slug>/
```

The exact generated URL is canonical for the website record.

Do not manually create alternate canonical URLs unless there is a deliberate architecture decision.

---

# 17. SLUG

Each public video page should have a stable readable slug.

Preferred characteristics:

- lowercase;
- descriptive;
- concise;
- hyphen-separated;
- based on the final topic/title where appropriate;
- free from unnecessary words.

Example:

```text
why-does-this-happen
```

Avoid:

```text
video1
test-video
final-final-video
abc123
```

---

# 18. LANGUAGE

Each video should identify its primary language.

Allowed examples:

```text
en
bn
```

For bilingual or localized relationships, maintain explicit relationships between language versions.

Example:

```text
English Video:
5vld4m

Bangla Version:
8xk2pz

Relationship:
localized_version_of
```

---

# 19. TOPIC RELATIONSHIPS

Each video can belong to:

- one primary topic;
- multiple secondary topics;
- one or more question clusters.

Example:

```text
Primary Topic:
Computers

Secondary Topics:
Internet
Networking
Web Technology

Question Cluster:
How does a website load?
```

Topic categories should remain flexible.

---

# 20. CORE QUESTION

Every significant video should have one primary question.

Example:

```text
How does a browser turn a website address into the page you see?
```

This should remain the conceptual center of the video.

Additional questions may exist, but the primary question should be clear.

---

# 21. QUESTION RELATIONSHIPS

A video can contain:

```text
primary_question
secondary_questions
follow_up_questions
related_questions
misconceptions
```

This information can later feed:

- QUESTION_ARCHIVE.md
- KNOWLEDGE_GRAPH.md
- website recommendations
- future video generation

---

# 22. SUMMARY

Every published video should eventually have a concise factual summary.

The summary should explain:

- what the video investigates;
- what the viewer learns;
- what the main mechanism or conclusion is.

It should not become a replacement for the full article or research archive.

---

# 23. RESEARCH REFERENCE

Every important video should point to its research material.

Possible field:

```text
research_location
```

Possible locations:

```text
research/<video-id>/
content/articles/<video-id>.md
external research archive
```

The exact storage system may evolve.

The relationship should remain persistent.

---

# 24. SOURCE RECORD

Each video should eventually identify its important sources.

Example:

```md
## Sources

- Official source
- Research paper
- Primary document
- High-quality reporting
```

Where useful, preserve:

```text
source_title
source_url
source_type
publication_date
access_date
claim_supported
```

Do not cite sources that do not support the actual claim.

---

# 25. ARTICLE RELATIONSHIP

Where a website article exists:

```text
video
↕
article
```

The article should provide deeper value rather than merely duplicating the YouTube description.

Possible article fields:

```text
article_path
article_status
article_last_updated
article_sources
```

---

# 26. THUMBNAIL RECORD

Record:

```text
thumbnail_status
thumbnail_concept
thumbnail_path
thumbnail_aspect_ratio
thumbnail_version
```

Format rule:

SHORT:

```text
9:16
```

LONG:

```text
16:9
```

Do not force one aspect ratio onto the other format.

---

# 27. VISUAL ASSET RECORD

Where applicable, track:

```text
visual_assets
generated_assets
source_assets
animation_assets
diagram_assets
b_roll_assets
```

Each asset should have a meaningful relationship to the video.

Avoid keeping unexplained orphan assets.

---

# 28. AUDIO RECORD

Track:

```text
voice_status
voice_language
music_status
sound_design_status
audio_mix_status
subtitle_status
```

The final audio should prioritize:

- clarity;
- pacing;
- believable emphasis;
- clean sound;
- useful sound design.

---

# 29. SEO RECORD

Each published video may track:

```text
seo_title
meta_description
canonical_url
keywords
topic_terms
search_questions
structured_data_status
sitemap_status
indexing_status
```

SEO should reflect the actual content.

Do not use irrelevant keyword stuffing.

---

# 30. ANALYTICS RECORD

After publication, record where data is available:

```text
views
watch_time
average_view_duration
retention
likes
comments
shares
subscribers_gained
traffic_sources
search_terms
returning_viewers
```

These values are snapshots and can change over time.

Where possible, preserve:

```text
analytics_date
analytics_period
```

so historical performance can be compared.

---

# 31. PERFORMANCE INSIGHTS

Do not record only numbers.

Record what the numbers appear to teach.

Examples:

```text
Hook Insight:
The first question created strong retention.

Packaging Insight:
The thumbnail created curiosity but did not clearly communicate the subject.

Search Insight:
The video began receiving long-tail search traffic.

Visual Insight:
The mechanism animation improved retention.
```

Insights should be evidence-based.

---

# 32. FUTURE OPPORTUNITIES

Every strong video should eventually generate possible future assets.

Track:

```text
follow_up_questions
short_expansion
long_form_opportunity
article_expansion
visual_expansion
comparison_opportunity
related_topics
```

Example:

```text
Original:
How does X work?

Follow-up:
Why does X fail?

Long-form:
The complete system behind X

Comparison:
X vs Y
```

---

# 33. RELATED VIDEOS

A video can link to:

```text
related_videos
previous_video
next_video
parent_topic_video
follow_up_video
deeper_dive_video
```

Do not create relationships simply to increase the number of links.

The relationship should make sense.

---

# 34. VIDEO RELATIONSHIP TYPES

Useful relationship labels include:

```text
RELATED_TO
FOLLOW_UP_TO
DEEPER_DIVE_OF
PART_OF
EXPLAINS
EXPANDS
COMPARES_WITH
CORRECTS
UPDATES
LOCALIZED_VERSION_OF
INSPIRED_BY_QUESTION
```

These relationships can later support the knowledge graph.

---

# 35. ARCHIVAL STATE

A video becomes ARCHIVED when:

- publication is complete;
- analytics have been recorded where practical;
- research/source records are preserved;
- website relationship is recorded;
- future opportunities have been captured;
- the final canonical version is identified.

Archived does not mean forgotten.

Archived means organized for future reuse.

---

# 36. VIDEO RECORD TEMPLATE

Use this as the general master template:

```yaml
video_id:
core_question:
working_title:
final_title:

type:
status:

youtube_video_id:
youtube_url:
website_url:
slug:

language:
publication_date:

primary_topic:
secondary_topics:

primary_question:
secondary_questions:
follow_up_questions:
related_questions:

summary:

research_status:
research_location:

verification_status:
verification_notes:

sources:

script_location:
script_version:

visual_concept:
visual_assets:
thumbnail_concept:
thumbnail_status:

voice_status:
audio_status:
subtitle_status:

seo_title:
meta_description:
keywords:
structured_data_status:
sitemap_status:
indexing_status:

related_videos:

views:
watch_time:
average_view_duration:
retention:
likes:
comments:
shares:
subscribers_gained:
traffic_sources:
search_terms:

performance_insights:

future_opportunities:

article_path:
article_status:

archive_status:
last_updated:
```

---

# 37. MINIMAL VIDEO RECORD

A minimal record may begin with only:

```yaml
video_id: 5vld4m
youtube_url: https://youtu.be/VIDEO_ID
type: long
status: published
```

The rest can be populated automatically or progressively.

This is important because the production system should remain easy to operate.

---

# 38. MINIMUM INPUT PRINCIPLE

The creator should not be forced to manually duplicate information.

Where the system can safely derive information automatically, it should.

Potentially automatic fields include:

- YouTube video ID;
- title;
- thumbnail;
- slug;
- website URL;
- page generation;
- sitemap entry;
- structured metadata.

Explicit human input should remain authoritative for information that cannot be reliably inferred.

---

# 39. CURRENT WEBSITE INPUT MODEL

The website content system supports the creator-friendly model:

```json
{
  "youtube_url": "https://youtu.be/VIDEO_ID",
  "type": "long",
  "status": "published"
}
```

or:

```json
{
  "youtube_url": "https://youtube.com/shorts/VIDEO_ID",
  "type": "short",
  "status": "published"
}
```

The explicit `type` is the source of truth for format.

The explicit `status` determines whether the item is publicly published.

---

# 40. DRAFT RULE

A video marked:

```text
status: draft
```

must not appear as public published content.

The build system should exclude draft content from:

- public archive;
- published video cards;
- public sitemap;
- public watch-page generation where appropriate.

Draft records may remain internally available.

---

# 41. PUBLISHED RULE

A video marked:

```text
status: published
```

may become eligible for:

- public archive;
- public video page;
- sitemap;
- structured data;
- search indexing;
- internal linking.

Publication should only happen after the quality gate is passed.

---

# 42. VIDEO INDEX UPDATE RULE

Whenever a video changes stage, update its status.

Whenever a major metadata item changes, update the corresponding record.

Important state changes include:

IDEA
→ RESEARCHING

RESEARCHING
→ VERIFIED

VERIFIED
→ SCRIPTED

SCRIPTED
→ EDITING

EDITING
→ REVIEW

REVIEW
→ PUBLISHED

PUBLISHED
→ ANALYZED

ANALYZED
→ ARCHIVED

---

# 43. VIDEO INDEX INTEGRITY

Never knowingly create:

- duplicate Video IDs;
- conflicting canonical URLs;
- multiple primary titles without versioning;
- mismatched YouTube IDs;
- broken website relationships;
- false publication dates.

When correcting an existing record, preserve historical information where it matters.

---

# 44. AI USAGE OF VIDEO INDEX

AI systems should read this index before:

- generating follow-up video ideas;
- suggesting duplicate topics;
- writing related articles;
- creating SEO metadata;
- planning content clusters;
- generating knowledge-graph relationships;
- analyzing the archive.

The index is a primary content registry.

---

# 45. DUPLICATE CHECK

Before proposing a new video, search the Video Index.

Check:

- same question;
- similar question;
- same topic;
- same mechanism;
- previous follow-up;
- existing long-form;
- previous correction/update.

A new video should only proceed when it provides meaningful new value.

---

# 46. UPDATE RULE

If a video receives:

- correction;
- new evidence;
- updated source;
- revised website article;
- new language version;
- follow-up;
- new long-form expansion;

the index should record the relationship.

Do not erase the history of the content unless there is a deliberate archival reason.

---

# 47. CANONICAL VIDEO ENTRY

Every video should ultimately have one canonical record.

Conceptually:

```text
ONE VIDEO
↓
ONE INTERNAL VIDEO ID
↓
ONE YOUTUBE ID
↓
ONE CANONICAL WEBSITE PAGE
↓
ONE ARCHIVE RECORD
```

Additional language versions or derivatives should link back to the canonical record.

---

# 48. VIDEO INDEX AS KNOWLEDGE FOUNDATION

The Video Index is not only a production tracker.

It is also a bridge between:

YouTube
+
Website
+
Research
+
Articles
+
Sources
+
Questions
+
Topics
+
Analytics
+
Future AI systems

Therefore, accuracy and consistency matter.

---

# 49. LONG-TERM ROLE

As Curious Reality grows, the Video Index may eventually evolve into:

- structured JSON;
- database records;
- searchable archive;
- knowledge graph source;
- analytics system;
- AI retrieval layer.

The format may change.

The underlying relationships should remain.

---

# 50. FINAL PRINCIPLE

Every Curious Reality video should exist as more than an upload.

It should become:

A Question
+
A Research Record
+
A Video
+
A Website Page
+
A Knowledge Asset
+
A Future Connection

---

# END OF VIDEO INDEX
```