import {
  releaseChannelFromNamespace,
  releaseChannelFromVersion,
  releaseInstallIdentity,
} from "@open-design/release";

const DEFAULT_WINDOW_TITLE = "Open Design";

export function resolvePackagedWindowTitle(config: { appVersion: string | null; namespace: string; productName?: string | null }): string {
  if (config.productName != null && config.productName.length > 0) return config.productName;
  const channel =
    releaseChannelFromVersion(config.appVersion) ??
    releaseChannelFromNamespace(config.namespace);
  return channel == null ? DEFAULT_WINDOW_TITLE : releaseInstallIdentity(channel).productName;
}
