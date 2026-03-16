export type AiHelperLaunchPayload = {
  tab?: "product" | "chat";
  question?: string;
  autoAsk?: boolean;
  dayContext?: string;
};

const AI_HELPER_EVENT = "ewl:open-ai-helper";

export function launchAiHelper(payload: AiHelperLaunchPayload) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<AiHelperLaunchPayload>(AI_HELPER_EVENT, {
      detail: payload,
    }),
  );
}

export function subscribeAiHelperLaunch(listener: (payload: AiHelperLaunchPayload) => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<AiHelperLaunchPayload>;
    listener(customEvent.detail ?? {});
  };

  window.addEventListener(AI_HELPER_EVENT, handler);
  return () => window.removeEventListener(AI_HELPER_EVENT, handler);
}
