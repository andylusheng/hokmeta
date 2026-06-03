---
name: "change-request-review"
description: "Reviews any code/file changes before execution, discusses impact and pros/cons. Invoke BEFORE making ANY changes to files or code."
---

# Change Request Review

## IMPORTANT: ALWAYS Invoke This Skill BEFORE Making Changes

This skill ensures all proposed changes are reviewed and approved before execution.

## Process

### 1. Before Making Any Changes
- **STOP** and invoke this skill first
- Do NOT modify ANY files until user confirms

### 2. Present the Change Proposal

Clearly document:

#### What is changing
- Which file(s) will be modified
- What the old content was
- What the new content will be

#### Impact Analysis
- What features/pages will be affected?
- What are the risks?
- Are there any breaking changes?

#### Pros & Cons
- **Pros**: Benefits of making this change
- **Cons**: Downsides or risks of making this change

#### Recommendation
- Your recommendation on whether to proceed

### 3. Wait for User Confirmation
- **Do NOT proceed** until user explicitly approves
- If user has questions or concerns, address them first

## Format Template

Use this structure when presenting changes:

```markdown
## Proposed Change

**Files to modify:** [list of file paths]

**Description:** [what the change does]

### Current State
[describe or show the current code]

### Proposed State
[describe or show the proposed code]

### Impact
- Affected features: [list]
- Breaking changes: Yes/No
- Risks: [list]

### Pros & Cons
**Pros:**
- [benefit 1]
- [benefit 2]

**Cons:**
- [downside 1]
- [downside 2]

### Recommendation
[Your recommendation: Proceed / Don't proceed / Modify and reconsider]

---

**Do you approve this change? Please reply with "approve" or provide feedback.**
```

## When to Invoke This Skill

**ALWAYS INVOKE BEFORE:**
- Modifying any file in the project
- Creating new files
- Deleting files
- Making configuration changes
- Updating dependencies
- Any other code-related changes

**DO NOT INVOKE WHEN:**
- Answering general questions
- Reading or searching files
- Explaining concepts (not making changes)
- User has already explicitly approved a change
