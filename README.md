# Sample Tidelift Webhook Receiver

This is the Hello World of receivers for Tidelift webhooks. It is built to run
as a Google Cloud function, receive a webhook, validate the signature, and log
the event type. Real usage would also then involve looking at the event type
and doing something as a result.

To use this, you'll need to create a Cloud Function similar to the example
in the [Google Cloud documentation](https://cloud.google.com/functions/docs/first-nodejs)
and set an environment variable for your function named TIDELIFT_SIGNING_SECRET which
is set to the signing secret for your webhook.
