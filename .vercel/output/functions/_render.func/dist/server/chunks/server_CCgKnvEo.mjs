import { i as resolveLocale, t as loadMessages } from "./loadMessages-DNBm8IQr_DB5OPNuW.mjs";
// node_modules/@emdash-cms/admin/dist/locales/server.js
var TOOLBAR_MESSAGES = {
	publish: {
		id: "visualEditing.publish",
		message: "Publish"
	},
	publishing: {
		id: "visualEditing.publishing",
		message: "Publishing…"
	},
	sessionExpired: {
		id: "visualEditing.sessionExpired",
		message: "Editing session expired. Refresh the page to continue."
	},
	refreshPage: {
		id: "visualEditing.refreshPage",
		message: "Refresh page"
	},
	publishFailed: {
		id: "visualEditing.publishFailed",
		message: "Publish failed. Check your permissions and try again."
	},
	editMode: {
		id: "visualEditing.editMode",
		message: "Edit mode"
	},
	openInAdmin: {
		id: "visualEditing.openInAdmin",
		message: "Open in admin"
	},
	hideToolbar: {
		id: "visualEditing.hideToolbar",
		message: "Hide toolbar"
	},
	draft: {
		id: "visualEditing.draft",
		message: "Draft"
	},
	published: {
		id: "visualEditing.published",
		message: "Published"
	},
	unpublishedChanges: {
		id: "visualEditing.unpublishedChanges",
		message: "Unpublished changes"
	},
	unsaved: {
		id: "visualEditing.unsaved",
		message: "Unsaved"
	},
	saving: {
		id: "visualEditing.saving",
		message: "Saving…"
	},
	saved: {
		id: "visualEditing.saved",
		message: "Saved"
	},
	saveFailed: {
		id: "visualEditing.saveFailed",
		message: "Save failed"
	},
	image: {
		id: "visualEditing.image",
		message: "Image"
	},
	noImageSelected: {
		id: "visualEditing.noImageSelected",
		message: "No image selected"
	},
	altText: {
		id: "visualEditing.altText",
		message: "Alt text"
	},
	altTextPlaceholder: {
		id: "visualEditing.altTextPlaceholder",
		message: "Describe the image"
	},
	replaceImage: {
		id: "visualEditing.replaceImage",
		message: "Replace"
	},
	uploadImage: {
		id: "visualEditing.uploadImage",
		message: "Upload"
	},
	removeImage: {
		id: "visualEditing.removeImage",
		message: "Remove"
	},
	mediaLibrary: {
		id: "visualEditing.mediaLibrary",
		message: "Media Library"
	},
	back: {
		id: "visualEditing.back",
		message: "Back"
	},
	loading: {
		id: "visualEditing.loading",
		message: "Loading…"
	},
	noImagesFound: {
		id: "visualEditing.noImagesFound",
		message: "No images found"
	},
	mediaLoadFailed: {
		id: "visualEditing.mediaLoadFailed",
		message: "Failed to load media"
	},
	uploadingFile: {
		id: "visualEditing.uploadingFile",
		message: "Uploading {filename}…"
	}
};
function resolveToolbarMessage(messages, descriptor) {
	const translated = descriptor.id ? messages[descriptor.id] : void 0;
	if (typeof translated === "string") return translated;
	if (Array.isArray(translated) && translated.every((token) => typeof token === "string" || token.length === 1)) return translated.map((token) => typeof token === "string" ? token : `{${token[0]}}`).join("");
	return descriptor.message ?? "";
}
function translateVisualEditingToolbarLabels(messages) {
	return {
		publish: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.publish),
		publishing: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.publishing),
		sessionExpired: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.sessionExpired),
		refreshPage: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.refreshPage),
		publishFailed: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.publishFailed),
		editMode: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.editMode),
		openInAdmin: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.openInAdmin),
		hideToolbar: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.hideToolbar),
		draft: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.draft),
		published: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.published),
		unpublishedChanges: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.unpublishedChanges),
		unsaved: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.unsaved),
		saving: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.saving),
		saved: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.saved),
		saveFailed: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.saveFailed),
		image: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.image),
		noImageSelected: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.noImageSelected),
		altText: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.altText),
		altTextPlaceholder: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.altTextPlaceholder),
		replaceImage: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.replaceImage),
		uploadImage: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.uploadImage),
		removeImage: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.removeImage),
		mediaLibrary: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.mediaLibrary),
		back: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.back),
		loading: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.loading),
		noImagesFound: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.noImagesFound),
		mediaLoadFailed: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.mediaLoadFailed),
		uploadingFile: resolveToolbarMessage(messages, TOOLBAR_MESSAGES.uploadingFile)
	};
}
async function loadVisualEditingToolbarLabels(request) {
	return translateVisualEditingToolbarLabels(await loadMessages(resolveLocale(request)));
}
export { loadVisualEditingToolbarLabels as t };
