// \0virtual:emdash/seed
var userSeed = {
	"$schema": "https://emdashcms.com/seed.schema.json",
	"version": "1",
	"meta": {
		"name": "Three Story Studio",
		"description": "Custom upholstery and soft goods for your home.",
		"author": "Three Story Studio"
	},
	"settings": {
		"title": "Three Story Studio",
		"tagline": "Custom upholstery and soft goods for your home.",
		"url": "https://www.threestorystudio.com"
	},
	"collections": [{
		"slug": "projects",
		"label": "Projects",
		"labelSingular": "Project",
		"titleField": "title",
		"urlPattern": "/projects/{slug}",
		"supports": [
			"drafts",
			"revisions",
			"seo"
		],
		"fields": [{
			"slug": "title",
			"label": "Name",
			"type": "string",
			"required": true,
			"searchable": true
		}, {
			"slug": "legacy_id",
			"label": "Previous Payload id",
			"type": "string",
			"indexed": true
		}]
	}, {
		"slug": "pieces",
		"label": "Pieces",
		"labelSingular": "Piece",
		"titleField": "title",
		"supports": [
			"drafts",
			"revisions",
			"search"
		],
		"fields": [
			{
				"slug": "title",
				"label": "Title",
				"type": "string",
				"required": true,
				"searchable": true
			},
			{
				"slug": "image",
				"label": "Image",
				"type": "image",
				"required": true
			},
			{
				"slug": "show_on_home",
				"label": "Home page slideshow",
				"type": "boolean",
				"indexed": true
			},
			{
				"slug": "finished_piece",
				"label": "Finished piece",
				"type": "boolean",
				"indexed": true
			},
			{
				"slug": "project_slug",
				"label": "Project slug",
				"type": "string",
				"indexed": true
			}
		]
	}],
	"menus": [{
		"name": "primary",
		"label": "Primary Navigation",
		"items": [
			{
				"type": "custom",
				"label": "Home",
				"url": "/"
			},
			{
				"type": "custom",
				"label": "Gallery",
				"url": "/gallery"
			},
			{
				"type": "custom",
				"label": "About",
				"url": "/about"
			}
		]
	}]
};
var seed = userSeed;
export { seed, userSeed };
