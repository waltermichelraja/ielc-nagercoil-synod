// This file is the single source of truth for what the admin app can edit.
// Each entry describes one JSON file in the frontend repo: where it lives,
// and a `schema` describing how to render a form for it.
//
// Field types the renderer understands:
//   text        — single-line input
//   textarea    — multi-line input
//   number      — numeric input
//   image       — photo upload/preview (schema.folder sets the target
//                 folder under frontend/public/images/)
//   object      — a fixed set of named sub-fields (schema.fields)
//   list        — a repeatable array of objects (schema.itemSchema
//                 describes one item; schema.itemLabel names new entries)
//   list-text   — a repeatable array of plain strings

const siteSchema = {
  type: "object",
  fields: [
    { key: "title", label: "Full site title", type: "text" },
    { key: "shortTitle", label: "Short title (header & footer)", type: "text" },
    { key: "tagline", label: "Tagline (Tamil)", type: "text" },
    { key: "notices", label: "Notice bar messages", type: "list-text" },
    {
      key: "contact",
      label: "Contact details",
      type: "object",
      fields: [
        { key: "officeName", label: "Office name", type: "text" },
        { key: "address", label: "Address", type: "textarea" },
        { key: "email", label: "Email", type: "text" },
        { key: "phone", label: "Phone", type: "text" },
        { key: "website", label: "Website", type: "text" },
        { key: "mapEmbedUrl", label: "Map embed URL", type: "text" },
      ],
    },
    {
      key: "social",
      label: "Social links",
      type: "object",
      fields: [
        { key: "facebook", label: "Facebook URL", type: "text" },
        { key: "instagram", label: "Instagram URL", type: "text" },
        { key: "youtube", label: "YouTube URL", type: "text" },
        { key: "whatsapp", label: "WhatsApp URL", type: "text" },
        { key: "twitter", label: "X / Twitter URL", type: "text" },
      ],
    },
    {
      key: "landing",
      label: "Landing page",
      type: "object",
      fields: [
        { key: "motto", label: "Motto", type: "text" },
        { key: "heroImage", label: "Hero background image", type: "image", folder: "" },
      ],
    },
  ],
};

const messageSchema = {
  type: "object",
  fields: [
    { key: "role", label: "Role", type: "text" },
    { key: "author", label: "Author", type: "text" },
    { key: "text", label: "Message", type: "textarea" },
  ],
};

const messagesSchema = {
  type: "list",
  itemLabel: "Message",
  itemSchema: messageSchema,
};

const eventItemSchema = {
  type: "object",
  fields: [
    { key: "title", label: "Title", type: "text" },
    { key: "date", label: "Date", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "image", label: "Photo", type: "image", folder: "events" },
  ],
};

const circleEventItemSchema = {
  type: "object",
  fields: [
    { key: "circle", label: "Circle", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "date", label: "Date", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "image", label: "Photo", type: "image", folder: "events" },
  ],
};

const eventsSchema = {
  type: "object",
  fields: [
    {
      key: "upcomingEvents",
      label: "Upcoming Events",
      type: "list",
      itemLabel: "Event",
      itemSchema: eventItemSchema,
    },
    {
      key: "synodEvents",
      label: "Synod Events",
      type: "list",
      itemLabel: "Event",
      itemSchema: eventItemSchema,
    },
    {
      key: "circleEvents",
      label: "Circle Events",
      type: "list",
      itemLabel: "Event",
      itemSchema: circleEventItemSchema,
    },
    {
      key: "schoolEvents",
      label: "School Events",
      type: "list",
      itemLabel: "Event",
      itemSchema: eventItemSchema,
    },
  ],
};

const officeBearerSchema = {
  type: "object",
  fields: [
    { key: "name", label: "Name", type: "text" },
    { key: "phone", label: "Phone", type: "text" },
    { key: "bio", label: "Bio", type: "textarea" },
    { key: "photo", label: "Photo", type: "image", folder: "people" },
  ],
};

const executiveMemberSchema = {
  type: "object",
  fields: [
    { key: "name", label: "Name", type: "text" },
    { key: "place", label: "Place", type: "text" },
    { key: "phone", label: "Phone", type: "text" },
    { key: "photo", label: "Photo", type: "image", folder: "people" },
  ],
};

const councilMemberSchema = {
  type: "object",
  fields: [
    { key: "name", label: "Name", type: "text" },
    { key: "place", label: "Place", type: "text" },
    { key: "phone", label: "Phone", type: "text" },
  ],
};

const synodBearersSchema = {
  type: "object",
  fields: [
    { key: "president", label: "President", type: "object", fields: officeBearerSchema.fields },
    { key: "vicePresident", label: "Vice President", type: "object", fields: officeBearerSchema.fields },
    { key: "secretary", label: "Secretary", type: "object", fields: officeBearerSchema.fields },
    { key: "jointSecretary", label: "Joint Secretary", type: "object", fields: officeBearerSchema.fields },
    { key: "treasurer", label: "Treasurer", type: "object", fields: officeBearerSchema.fields },
    {
      key: "executiveMembers",
      label: "Synod Executive Members",
      type: "list",
      itemLabel: "Member",
      itemSchema: executiveMemberSchema,
    },
    {
      key: "churchCouncilMembers",
      label: "Church Council Members",
      type: "list",
      itemLabel: "Member",
      itemSchema: councilMemberSchema,
    },
    {
      key: "trustAssociationMembers",
      label: "Trust Association Members",
      type: "list",
      itemLabel: "Member",
      itemSchema: councilMemberSchema,
    },
  ],
};

const circleExecutiveSchema = {
  type: "object",
  fields: [
    { key: "name", label: "Name", type: "text" },
    { key: "pastorate", label: "Pastorate", type: "text" },
  ],
};

const circleSchema = {
  type: "object",
  fields: [
    { key: "name", label: "Circle name", type: "text" },
    { key: "slug", label: "URL slug (lowercase, no spaces)", type: "text" },
    { key: "pastors", label: "Pastors", type: "number" },
    { key: "probationers", label: "Probationers", type: "number" },
    { key: "pastorates", label: "Pastorates", type: "number" },
    { key: "congregations", label: "Congregations", type: "number" },
    { key: "gospelCenters", label: "Gospel Centers", type: "number" },
    {
      key: "schools",
      label: "Schools",
      type: "object",
      fields: [
        { key: "primary", label: "Primary", type: "number" },
        { key: "middle", label: "Middle", type: "number" },
        { key: "hs", label: "High School", type: "number" },
        { key: "hss", label: "Hr. Sec. School", type: "number" },
        { key: "total", label: "Total", type: "number" },
      ],
    },
    { key: "president", label: "President", type: "text" },
    { key: "vicePresident", label: "Vice President", type: "text" },
    { key: "secretaryTreasurer", label: "Secretary cum Treasurer", type: "text" },
    { key: "jointSecretary", label: "Joint Secretary", type: "text" },
    {
      key: "executiveMembers",
      label: "Circle Executives",
      type: "list",
      itemLabel: "Member",
      itemSchema: circleExecutiveSchema,
    },
  ],
};

const circlesSchema = {
  type: "list",
  itemLabel: "Circle",
  itemSchema: circleSchema,
};


const circularItemSchema = {
  type: "object",
  fields: [
    { key: "subject", label: "Subject", type: "text" },
    { key: "message", label: "Message / Content", type: "textarea" },
    { key: "attachment", label: "File attachment (PDF or image)", type: "attachment", folder: "circulars", accept: "application/pdf,image/png,image/jpeg,image/webp,image/svg+xml" },
    { key: "date", label: "Date & time", type: "datetime" },
    { key: "category", label: "Category", type: "select", options: [{ value: "GENERAL", label: "GENERAL" }] },
  ],
};

const circularsSchema = {
  type: "list",
  itemLabel: "Circular",
  itemSchema: circularItemSchema,
};

const overviewSchema = {
  type: "object",
  fields: [
    { key: "circles", label: "Circles", type: "number" },
    { key: "pastors", label: "Pastors", type: "number" },
    { key: "probationers", label: "Probationers", type: "number" },
    { key: "pastorates", label: "Pastorates", type: "number" },
    { key: "congregations", label: "Congregations", type: "number" },
    { key: "gospelCenters", label: "Gospel Centers", type: "number" },
    { key: "schools", label: "Schools", type: "number" },
    { key: "members", label: "Members", type: "number" },
    { key: "description", label: "Overview description", type: "textarea" },
  ],
};

// The list the Dashboard renders. `key` is used in the URL
// (/edit/:key) and must be unique.
const CONTENT_SECTIONS = [
  {
    key: "site",
    label: "Site Settings",
    description: "Titles, tagline, notices, contact details, social links, landing page.",
    path: "frontend/src/data/content/site.json",
    schema: siteSchema,
  },
  {
    key: "messages",
    label: "Messages",
    description: "President's, Vice President's, Secretary's, and other leadership messages.",
    path: "frontend/src/data/content/messages.json",
    schema: messagesSchema,
  },
  {
    key: "circulars",
    label: "Circulars",
    description: "Official circulars, notices, job posts, news, and other announcements.",
    path: "frontend/src/data/content/circulars.json",
    schema: circularsSchema,
  },
  {
    key: "events",
    label: "Events",
    description: "Upcoming, Synod, Circle, and School events.",
    path: "frontend/src/data/content/events.json",
    schema: eventsSchema,
  },
  {
    key: "synodBearers",
    label: "Synod Office Bearers",
    description: "President through Treasurer, Executive Members, Council & Trust Association.",
    path: "frontend/src/data/content/synodBearers.json",
    schema: synodBearersSchema,
  },
  {
    key: "circles",
    label: "Circles",
    description: "Per-circle statistics, office bearers, and executives.",
    path: "frontend/src/data/content/circles.json",
    schema: circlesSchema,
  },
  {
    key: "overview",
    label: "Overview",
    description: "Synod-wide statistics and the Overview page description.",
    path: "frontend/src/data/content/overview.json",
    schema: overviewSchema,
  },
];

function getSection(key) {
  return CONTENT_SECTIONS.find((section) => section.key === key);
}

export { CONTENT_SECTIONS, getSection };
