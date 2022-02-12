require('dotenv').config()

const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000
});

app.event('message', async ({ event, client, logger }) => {
    console.log('event', event)
    try {
      if (event.text === RegExp(/add/i)) {

      }
    }
    catch (error) {
      logger.error(error);
    }
  });

app.shortcut('add_todo', async ({ ack, payload, client }) => {
    await ack()

    try {
        const todo = await client.views.open({
            trigger_id: payload.trigger_id,
            view: {
                "type": "modal",
                "title": {
                    "type": "plain_text",
                    "text": "My App",
                    "emoji": true
                },
                "submit": {
                    "type": "plain_text",
                    "text": "Submit",
                    "emoji": true
                },
                "close": {
                    "type": "plain_text",
                    "text": "Cancel",
                    "emoji": true
                },
                "blocks": [
                    {
                        "type": "header",
                        "text": {
                            "type": "plain_text",
                            "text": "Add a Todo",
                            "emoji": true
                        }
                    },
                    {
                        "type": "divider"
                    },
                    {
                        "type": "input",
                        "element": {
                            "type": "plain_text_input",
                            "action_id": "plain_text_input-action"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Title",
                            "emoji": true
                        }
                    },
                    {
                        "type": "input",
                        "element": {
                            "type": "plain_text_input",
                            "action_id": "plain_text_input-action"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Description",
                            "emoji": true
                        }
                    },
                    {
                        "type": "input",
                        "element": {
                            "type": "datepicker",
                            "initial_date": "1990-04-28",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select a date",
                                "emoji": true
                            },
                            "action_id": "datepicker-action"
                        },
                        "label": {
                            "type": "plain_text",
                            "text": "Due Date",
                            "emoji": false
                        }
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "checkboxes",
                                "options": [
                                    {
                                        "text": {
                                            "type": "plain_text",
                                            "text": "Already Completed!",
                                            "emoji": false
                                        },
                                        "value": "completed"
                                    }
                                ],
                                "action_id": "complete"
                            }
                        ]
                    }
                ]
            }
        })
        console.log("resulting todo: ", todo)
    }
    catch(err) {
        console.error(err)
    }
  });

  app.action('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
  });

(async () => {
  // Start your app
  await app.start();

  console.log('⚡️ Bolt app is running!');
})();