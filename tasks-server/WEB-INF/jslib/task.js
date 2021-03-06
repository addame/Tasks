Class({
  id: "task",
  properties: {
    name: { type: "any", optional: false },
    description: { type: "any", optional: true },
    type: { type: "any", optional: true },
    priority: { type: "any", optional: true },
    status: { type: "any", optional: true, },
    validation: { type: "any", optional: true, },
    effort: { type: "any", optional: true },
    submitter: { optional: true },
    assignee: { optional: true }
  }
});
