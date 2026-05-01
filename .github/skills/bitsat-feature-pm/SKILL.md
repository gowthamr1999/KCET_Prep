---
name: bitsat-feature-pm
description: 'Suggest and prioritize high-impact product features for BITSAT student prep platforms. Use when planning roadmap, improving student outcomes, choosing MVP scope, ranking features by impact vs effort, defining experiments, and writing implementation-ready feature briefs.'
argument-hint: 'Goal, user segment, and timeline (for example: improve BITSAT mock completion in 30 days)'
user-invocable: true
disable-model-invocation: false
---

# BITSAT Product Feature PM Skill

Use this skill to generate practical, student-centered feature recommendations for a BITSAT preparation website.

## Default Operating Mode
- Scope default: both workspace and reusable personal applicability
- Output default: detailed PM-style response (not short checklist)
- Optimization bias: score-improvement first, growth second

Apply this bias order when trade-offs exist:
1. Features that increase test accuracy, pacing, and review quality
2. Features that improve repeat usage and consistency
3. Features focused mostly on acquisition or social spread

## What This Skill Produces
- Student pain-point map (exam prep, motivation, speed, accuracy, consistency)
- Prioritized feature list with impact, effort, risk, and dependencies
- MVP recommendation and phased rollout plan
- Success metrics and experiment ideas
- Implementation-ready feature briefs for engineering/design

## When to Use
- You need strong feature ideas, not generic suggestions
- You want to pick the next best feature for student outcomes
- You need roadmap decisions under time/resource constraints
- You are preparing PM specs for developers

By default, assume the product goal is improving measurable BITSAT score outcomes.

## Inputs to Collect First
1. Product goal (growth, retention, score improvement, conversion, engagement)
2. Primary user segment (class 11, class 12, repeaters, high-scorers, low-confidence students)
3. Time horizon (7 days, 30 days, quarterly)
4. Constraints (team size, engineering capacity, data availability)
5. Current baseline (attempts/day, completion rate, avg score, repeat usage)

If some inputs are missing, proceed with explicit assumptions and label them.

## Workflow
1. Define student jobs-to-be-done:
- Example jobs: "finish full mock under pressure", "reduce silly mistakes", "track weak topics", "compare with peers fairly".

2. Build a pain-point map:
- Before test: anxiety, no plan, topic uncertainty
- During test: poor pacing, over-attempting, no section strategy
- After test: weak review process, no actionable next step

3. Generate feature candidates by problem cluster:
- Preparation features (study plans, topic sequencers, daily drills)
- Test-performance features (pacing coach, section strategy assistant)
- Review features (mistake taxonomy, smart retry sets)
- Motivation/social features (streaks, group goals, score rooms)

4. Score features with a simple model:
- Impact (1-5)
- Confidence (1-5)
- Effort (1-5; lower is better)
- Priority score = (Impact x Confidence) / Effort

5. Select delivery slices:
- MVP now: highest score, lowest risk, fast to ship
- Next: dependency-heavy or medium confidence ideas
- Later: bets requiring data/infra changes

6. Define success metrics before build:
- Primary metric (for example, mock completion rate)
- Guardrail metric (for example, time-to-start test, drop-off)
- Leading indicators (for example, review completion, retries)

7. Prepare execution brief for each selected feature:
- Problem
- Proposed solution
- User flow
- Edge cases
- Success criteria
- Instrumentation events

## Decision Branches
- If retention is low: prioritize post-test review loops and personalized next-step recommendations.
- If completion is low: prioritize pacing aids, shorter adaptive tests, and smoother onboarding.
- If scores stagnate: prioritize mistake analysis, weak-topic practice queues, and spaced revision.
- If acquisition is low: prioritize shareable results, public challenge links, and referral mechanics.

## Quality Criteria (Definition of Done)
A good output must include all of the following:
1. At least 8 feature ideas across at least 3 problem clusters
2. Clear priority ranking with explicit reasoning
3. A 30-day MVP plan with no more than 3 features
4. Metrics per feature (primary, guardrail, and event tracking)
5. Risks, trade-offs, and dependency callouts

## Output Format
Use this exact structure:
1. Product Goal and Assumptions
2. Student Pain-Point Map
3. Feature Backlog (ranked table)
4. MVP Recommendation (top 3)
5. Experiment Plan (A/B or phased rollout)
6. Success Metrics and Instrumentation Events
7. Build Notes for Engineering

Response depth guideline:
- Use detailed output unless the user explicitly asks for a concise checklist.

## Example Prompts
- /bitsat-feature-pm improve mock completion for class 12 students in 30 days
- /bitsat-feature-pm suggest retention features after first test attempt
- /bitsat-feature-pm choose top 3 features for score improvement with small team

## Guardrails
- Avoid generic gamification with no exam-performance linkage
- Prefer features that improve actual score behavior, not vanity metrics
- Keep recommendations feasible for current product architecture
- Always include what not to build yet
