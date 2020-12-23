// Copyright 2020 Tidelift, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const crypto = require('crypto');

const { TIDELIFT_SIGNING_SECRET } = process.env;

const verifyWebhook = (payload, signature) => {
  const hash = crypto.createHmac('sha256', TIDELIFT_SIGNING_SECRET).update(payload).digest('hex');
  return signature === `sha256=${hash}`;
};

exports.hook = (req, res) => {
  if (req.method !== 'POST') {
    res.status(200).send('Webhooks are received as a POST');
    return;
  }

  // we have to use the raw, unparsed body for signature verification
  const body = req.rawBody;
  if (!verifyWebhook(body, req.header('x-tidelift-signature'))) {
    res.status(403).send('Signature does not match');
    return;
  }
  // now we'll look at data from the parsed body
  const parsed = req.body;
  console.log(`Received an event from Tidelift with event_type=${parsed.event_type}`);
  // in a real webhook, we would now work with the data in the webhook
  res.send('OK');
};
