# Partners

Smooch has a rapidly growing [partner ecosystem](https://smooch.io/partners/). If you have a product or service that could benefit from Smooch's connected channels, messaging features, and more, we'd love to offer it on the Smooch marketplace. Smooch uses [OAuth](https://tools.ietf.org/html/rfc6749) to facilitate the installation of parter integrations.

First, you should [contact us](https://smooch.io/partners/) about becoming a partner and we'll provision you with a client id and everything else you'll need to build your end of the OAuth flow. In the meantime the OAuth endpoints detailed below can be tested by impersonating Shoplifter, a partnership we built for testing purposes.

## Add to Smooch Button

The HTML template below can be used to place an "Add to Smooch" button on your website.

<p class="add-to-smooch-button">
    <a href="https://app.smooch.io/oauth/authorize?client_id=shoplifter"><img alt="Add to Smooch" height="40" width="165" src="https://cdn.smooch.io/images/add_to_smooch.png" srcset="https://cdn.smooch.io/images/add_to_smooch.png 1x, https://cdn.smooch.io/images/add_to_smooch@2x.png 2x"/></a>
</p>

```html
<a href="https://app.smooch.io/oauth/authorize?client_id=shoplifter"><img alt="Add to Smooch" height="40" width="165" src="https://cdn.smooch.io/images/add_to_smooch.png" srcset="https://cdn.smooch.io/images/add_to_smooch.png 1x, https://cdn.smooch.io/images/add_to_smooch@2x.png 2x"/></a>
```

## Authorize Endpoint

<api>`GET https://app.smooch.io/oauth/authorize`</api>

This endpoint begins the OAuth flow. It relies on a browser session for authentication. If the user is not logged in to Smooch they will be redirected to the login page. If the user has many apps, they will first be prompted to select the one they wish to integrate with. They will then be presented with an Allow/Deny dialog, describing details of the access your integration is requesting.

| *Parameter* | *Description* |
|-------------|---------------|
| **client_id**<br/><span class='req'>required</span> | Your integration's unique identifier |
| **response_type**<br/><span class='req'>required</span>  | For now the only acceptable value is `code` |
| **state**<br/><span class='opt'>optional</span>  | You may pass in any arbitrary string value here which will be returned to you along with the code via browser redirect |

### Request:

```
https://app.smooch.io/oauth/authorize?client_id=shoplifter&response_type=code
```

### Success Response

A successful response is delivered via a 302 redirect to the redirect URI configured by your integration.

| *Parameter* | *Description* |
|-------------|---------------|
| **code** | An authorization code which can be exchanged for an access token |
| **state** | Your state parameter (if one was provided) |

### Error Response

| *Parameter* | *Description* |
|-------------|---------------|
| **error**   | For example: `access_denied` |
| **state**   | Your state parameter (if one was provided) |

### Error Codes

| *Error Code* | *Delivery Method* | *Description* |
|--------------|-------------------|---------------|
| **access_denied** | 302 | The user denied access |

## Token Endpoint

<api>`POST https://app.smooch.io/oauth/token`</api>

This endpoint is used to exchange an authorization code can be exchanged for an access token. It should only be used in server-to-server calls.

| *Parameter* | *Description* |
|-------------|---------------|
| **code**<br/><span class='req'>required</span> | The authorization code received via `/oauth/authorize` |
| **grant_type**<br/><span class='req'>required</span> | Must be set to `authorization_code` |
| **client_id**<br/><span class='req'>required</span> | Your integration's unique identifier |
| **client_secret**<br/><span class='req'>required</span> | Your integration's secret |

### Request:

```
curl -X POST https://api.smooch.io/oauth/token \
     -d code=your_code \
     -d grant_type=authorization_code \
     -d client_id=shoplifter \
     -d client_secret=secret
```

### Success Response:

| *Parameter* | *Description* |
|-------------|---------------|
| **access_token** | An access token that can now be used to call Smooch APIs |
| **token_type** | `Bearer`. All issued tokens are of this type |