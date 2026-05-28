"use server";
import { revalidatePath } from "next/cache";

const SERVER_URL = process.env.SERVER_URL;

const history: string[][] = [
  ["The capital of Vietnam is **Hanoi**."],
  [
    "Napoleon Bonaparte was a **French military and political leader** who rose to prominence during the French Revolution and became a dominant figure in early 19th-century Europe. He is one of the most famous and influential figures in history.",
    "",
    "Here's a breakdown of his significance:",
    "",
    "**Early Life and Rise to Power:**",
    "",
    "*   Born on the island of Corsica in 1769, Napoleon received a military education.",
    "*   He distinguished himself during the French Revolution, demonstrating exceptional strategic and tactical brilliance in military campaigns.",
    "*   Through a series of successful military victories and political maneuvering, he eventually seized power in a coup d'état in 1799, becoming First Consul of France.",
    "",
    "**Emperor of the French:**",
    "",
    "*   In 1804, he crowned himself **Emperor of the French**, establishing the First French Empire.",
    "*   Under his rule, France experienced a period of significant reform and expansion.",
    "",
    "**Key Achievements and Actions:**",
    "",
    "*   **Napoleonic Wars:** Napoleon waged a series of ambitious wars across Europe, often referred to as the Napoleonic Wars. He achieved remarkable early successes, conquering much of continental Europe and establishing a vast empire.",
    "*   **Napoleonic Code:** A lasting legacy, the Napoleonic Code (Civil Code of 1804) was a comprehensive legal framework that influenced legal systems across Europe and the world. It promoted principles like equality before the law, property rights, and freedom of religion.",
    "*   **Reforms:** He implemented numerous administrative, educational, and economic reforms that modernized France and had a lasting impact. This included establishing the Bank of France, reorganizing the education system, and creating a centralized administration.",
    "*   **Military Genius:** He is widely regarded as one of the greatest military commanders in history, known for his innovative tactics, speed of maneuver, and ability to inspire his troops.",
    "",
    "**Downfall and Exile:**",
    "",
    "*   His ambition eventually led to overreach. The disastrous invasion of Russia in 1812 marked a turning point.",
    "*   He was defeated by a coalition of European powers and forced to abdicate in 1814, exiled to the island of Elba.",
    '*   He briefly returned to power in 1815 during the "Hundred Days," but was ultimately defeated at the **Battle of Waterloo**.',
    "*   He was then exiled to the remote island of Saint Helena, where he died in 1821.",
    "",
    "**Legacy:**",
    "",
    "Napoleon's impact on history is profound and complex:",
    "",
    "*   **Spread of Revolutionary Ideas:** His conquests, while oppressive in some ways, also helped spread some of the ideals of the French Revolution, such as nationalism and legal equality, across Europe.",
    "*   **Nationalism:** His actions inadvertently fostered a sense of national identity and resistance in the conquered nations, contributing to the rise of modern nation-states.",
    "*   **Warfare:** His military strategies and tactics were studied and emulated for generations.",
    "*   **Controversial Figure:** He is a figure of both admiration and criticism. Some see him as a brilliant reformer and liberator, while others view him as a ruthless dictator and warmonger.",
    "",
    "In essence, Napoleon was a transformative figure who reshaped the political map of Europe, left a significant legal and administrative legacy, and remains a captivating subject of historical study and debate.",
  ],
];

export async function getChatHistory() {
  return history;
}

export async function submitPrompt(formData: FormData) {
  const prompt = formData.get("prompt");

  if (!prompt || typeof prompt != "string") {
    console.log("Prompt field must be a string");
    return;
  }

  const url = `${SERVER_URL}/chat`;
  const content = { prompt: prompt };

  try {
    const jsonResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });

    console.log(jsonResponse.status);

    const response = await jsonResponse.json();

    history.push([prompt]);
    history.push(response.response);

    console.log(response);
  } catch (err) {
    console.log(err);
  }

  revalidatePath("/");
}
