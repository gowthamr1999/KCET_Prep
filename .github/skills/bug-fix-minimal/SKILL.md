---
name: bug-fix-minimal
description: "Fix bugs in the repo following Karpathy's 4 principles: don't assume (surface confusion & tradeoffs), minimum code only, touch only what you must, define success and verify. Use when: investigating bugs, fixing issues, patching errors while maintaining code quality."
argument-hint: "Describe the bug, symptom, or error message"
---

# Bug Fix (Minimal)

## Core Principles

1. **Don't assume. Don't hide confusion. Surface tradeoffs.**
   - Ask clarifying questions before diving in
   - List unknowns and constraints explicitly
   - Explain why a fix might fail or create side effects

2. **Minimum code that solves the problem. Nothing speculative.**
   - Write only what's needed to fix the specific issue
   - Don't add error handling "just in case"
   - Don't refactor surrounding code

3. **Touch only what you must. Clean up only your own mess.**
   - Make surgical, targeted changes
   - Don't reformat unrelated files
   - Don't fix other bugs in the same commit

4. **Define success criteria. Loop until verified.**
   - Be explicit: "Fixed when X no longer happens"
   - Validate the fix actually works
   - Run the test or reproduction case to confirm

## Procedure

### 1. Clarify & Surface Unknowns
- **What**: Describe the exact symptom, error message, or unexpected behavior
- **Where**: Which file(s) or module(s) are affected?
- **When**: Under what conditions does it occur? (specific input, state, environment)
- **Assumptions to question**: Are you assuming root cause? Say it explicitly
- **Tradeoffs**: Could a fix break something else? List them

**Output**: A 3-5 sentence problem statement with explicit unknowns and constraints

### 2. Locate & Understand (Minimal Search)
- Find only the minimum code path from symptom to root cause
- Don't explore unrelated code
- Identify the exact line(s) causing the issue
- Quote the problematic code and explain *why* it's wrong

**Output**: File path(s), line numbers, and a one-sentence explanation of the bug

### 3. Design the Fix (Smallest Change)
- Write only the code needed to fix the bug, nothing more
- Don't add logging, validation, or defensive checks
- Don't refactor variable names or reorder code
- List any workarounds or alternatives and why you chose this one

**Output**: The exact change (3-5 lines max typically)

### 4. Apply & Verify
- Edit only the files necessary for the fix
- Run a reproduction case or test to confirm the bug is gone
- Check that no new errors appear
- Don't clean up unrelated code

**Output**: Verification statement: "Bug fixed. Verified by [test/reproduction case]."

## Checklist

- [ ] Problem statement is explicit (no hidden assumptions)
- [ ] Root cause is identified, not guessed
- [ ] Fix is minimal (no speculative code)
- [ ] Only affected files are touched
- [ ] Success criteria defined and verified
- [ ] No unrelated cleanup or refactoring

## Example Scenarios

**Scenario: Logic error**
- Bug: "Function returns wrong value when X > 100"
- Fix: Change one comparison operator or return statement
- Verify: Run with test case X=101, confirm output

**Scenario: Missing check**
- Bug: "Crashes when array is empty"
- Fix: Add one guard clause, nothing else
- Verify: Pass empty array, confirm no crash

**Scenario: Wrong variable**
- Bug: "Uses `userId` instead of `accountId`"
- Fix: Change the variable name in that one line
- Verify: Confirm the correct ID flows through

## When to Stop

- The specific bug is fixed
- You can reproduce the fix working
- No unrelated code was touched

Do not continue to:
- Refactor nearby code
- Add defensive error handling beyond the fix
- Optimize performance
- Improve the overall design
