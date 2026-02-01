import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "polaris-ide",
  name: "Polaris Cloud IDE",
});
