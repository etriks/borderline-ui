/**
 */

export const FORM_ACTION_LOAD = 'FORM_ACTION_LOAD_MESSAGE';
export const FORM_ACTION_LOADED = 'FORM_ACTION_LOADED_MESSAGE';
export const FORM_ACTION_SAVE = 'FORM_ACTION_SAVE_MESSAGE';
export const FORM_ACTION_SAVED = 'FORM_ACTION_SAVED_MESSAGE';
export const FORM_ACTION_SCHEMA_UPDATE = 'FORM_ACTION_SCHEMA_UPDATE_MESSAGE';
export const FORM_ACTION_SCHEMA_ERROR = 'FORM_ACTION_SCHEMA_ERROR_MESSAGE';
export const FORM_ACTION_UI_UPDATE = 'FORM_ACTION_UI_UPDATE_MESSAGE';
export const FORM_ACTION_UI_ERROR = 'FORM_ACTION_UI_ERROR_MESSAGE';

export const default_schema = {
    formSchema:
        `{
      "title": "Borderline form default",
      "type": "object",
      "required": [
            "title"
      ],
      "properties": {
            "title": {
                  "type": "string",
                  "title": "Title",
                  "default": "Default title"
            },
            "done": {
                  "type": "boolean",
                  "title": "bool",
                  "default": false
            }
      }
}`,
    formUi: '{}',
    formData: '{}'
};

export const mock_schema = {
    formSchema: `
    {
        "title": "Borderline mock form",
        "type": "object",
        "required": ["title"],
        "properties": {
            "title": {"type": "string", "title": "Title", "default": "Default"},
            "integer": {"type": "integer", "title": "integer"},
            "range": {"type": "integer", "title": "range"},
            "bool": {"type": "boolean", "title": "bool", "default": false}
        }
    }`,
    formUi: `{
        "range": {
            "ui:widget": "range"
        }
    }`,
    formData: '{}'
};
