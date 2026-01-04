import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== NAIL POLISH INVENTORY SCHEMA =========================================
This schema defines:
1. Polish model - stores all nail polish product data
2. UserPreference model - stores user favorites and next appointment selections

Schema matches migration plan Phase 1.1 requirements:
- Polish: Brand, Number, Name, Link, ImageAddress, LocalImage, Colors[], Finish
- UserPreference: userId, favoritePolishIds[], nextApptPolishIds[]
=========================================================================*/

const schema = a.schema({
  // Polish model - represents individual nail polish products
  Polish: a
    .model({
      brand: a.string().required(),
      number: a.string().required(), // Note: NOT unique - duplicates exist
      name: a.string().required(),
      link: a.url().required(), // External product link
      imageAddress: a.url(), // Original web image URL
      localImage: a.string().required(), // Path to local image in /public/images/
      colors: a.string().array().required(), // Multi-value: ["Red", "Pink", etc.]
      finish: a.enum([
        "Cream",
        "Shimmer",
        "Cat Eye",
        "Mood Change",
        "Sheer",
        "Glitter",
      ]),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]), // Anyone can read polishes
    ]),

  // UserPreference model - stores per-user favorites and next appointment picks
  UserPreference: a
    .model({
      userId: a.string().required(), // Links to authenticated user or localStorage ID
      favoritePolishIds: a.string().array(), // Array of Polish IDs
      nextApptPolishIds: a.string().array(), // Array of Polish IDs for next appointment
    })
    .authorization((allow) => [
      allow.publicApiKey(), // Allow public access for localStorage fallback
      allow.owner(), // Authenticated users can only access their own preferences
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});


/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
