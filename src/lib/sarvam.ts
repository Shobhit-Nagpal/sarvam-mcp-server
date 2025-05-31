import { SarvamAIClient } from "sarvamai";
import envManager from "../common/env.js";

const sarvam = new SarvamAIClient({
  apiSubscriptionKey: envManager.getSarvamAPIKey(),
})

export default sarvam;
