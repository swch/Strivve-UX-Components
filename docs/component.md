# Component

Contains functions to render components on the website.

```js
const component = Strivve.createComponent({ core, appearance, localization });
```

## Params

| name         | params                   | description |
| ------------ | ------------------------ | ----------- |
| core         | `core instance` | required    |
| appearance   | `Appearance`             | optional    |
| localization | `Localization`           | optional    |

## Localization

Interface representing localization options.
```js
{
    intro_title: 'Update your card info everywhere you pay, the easier way!',
    intro_icon_text: 'Save time. Log in. We’ll do the rest.',
    intro_step_title: 'Here’s how:',
    intro_step_one: 'STEP 1',
    intro_step_one_description: 'On the next screen, select sites you shop with, and log in.',
    intro_step_two: 'STEP 2',
    intro_step_two_description: 'We’ll update your card information on that site for you.',
    intro_btn: 'Get Started',

    logon_forgot_signin: "Forgot your sign-in? Let's go find it.",
    site_selection_btn_all_sites: "View all sites",
    logon_btn_cancel: "Cancel",
    logon_btn_link: "Link Account",
    logon_progress_cancel: "Cancel",
    logon_link_success_btn_browse: "Browse More Sites",
    logon_link_error_btn: "Try a Different Site",
    logon_unpw_btn_verify: "Verify",
    logon_unpw_cancel: "Cancel",
    logon_cancel_btn_leave: "Leave",
    logon_cancel_btn_stay: "Stay",
    logon_otp_btn_verify: "Verify",
    logon_otp_cancel: "Cancel",
    logon_otp_retry_btn_verify: "Verify",
    logon_otp_retry_cancel: "Cancel",
    logon_password_btn_verify: "Verify",
    logon_password_cancel: "Cancel",

    placement_success_details_btn_close: "Close",
    placement_error_details_btn_close: "Close",
    logon_title: "Securely link your account",
    logon_link_success_title: "We're Still Finishing Up",
    logon_card_placement_success_title: "",
    placement_success_details_title: "Success!",
    placement_error_details_title: "Error!",
    all_sites_search_default: "Enter a site or brand name",
    logon_username_default: "Email/Username",
    logon_password_default: "Password",
    site_selection_title: "Select a site for us to push your updated card to.",
    all_sites_title: "Select a site for us to push your updated card to.",
    all_sites_search_site_title: "Search site",
    all_sites_success_text: "You've placed your card at <n> sites.",
    all_sites_failure_text: "See your recent <n> site(s) that failed",
    logon_text: "Rest Easy. Acme does not store your logon credentials",
    logon_progress_title: "Logging In....",
    logon_link_success_text: "This might take a minute. Select another site to update while you wait.",
    logon_card_placement_success_background: "Your card was placed successfully",
    logon_unpw_retry: "The initial credentials you have provided are incorrect.",
    long_username_retry: "The initial credentials you have provided are incorrect.",
    logon_cancel_title: "We're still trying to connect",
    logon_cancel_text: "We may not be able to. Do you want to stick around and find out?",
    logon_otp_text: "The site is requiring additional information.",
    logon_otp_default: "Enter the one-time passcode sent to you.......",
    logon_otp_retry_text: "The site is requiring additional information.",
    logon_otp_retry_default: "",
    logon_password_text: "This site is requiring additional information",
    my_sites_error_title: "Errors",
    my_sites_error_text: "The following site encountered a logon error. Click more for details.",
    my_sites_success_title: "Successful placement",
    my_sites_success_text: "Your card details were successfully placed on the following sites",
    placement_success_details_text: "Your card details were successfully placed on this site.",
  }
```

## Method

| name                | params                                                                             |
| ------------------- | ---------------------------------------------------------------------------------- |
| mountAccountLink    | (id: string, options: [mountAccountLinkViewOptions](#mountAccountLinkViewOptions)) |
| unmountAccountLink  | (id: string)                                                                       |
| mountSelectSite     | (id: string, options?: mountSelectSiteViewOptions)                                 |
| unmountSelectSite   | (id: string)                                                                       |
| mountLinkingJourney | (id: string, options: [MountFullAccountLinkOptions](#MountFullAccountLinkOptions)) |

## mountAccountLinkViewOptions <a href="#mountAccountLinkViewOptions" id="mountAccountLinkViewOptions"></a>

| Name          | Type                                           | Description                                                                                                                   |
| ------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `site_id`     | `string`                                       | The ID of the site to link the account to.                                                                                    |
| `quick_start` | `boolean` (optional)                           | A boolean value indicating whether to enable quick start mode.                                                                |
| `subscribe`   | `(state: AccountLinkState) => void` (optional) | A callback function that subscribes to changes in the state of the account link view. It receives the updated state as input. |
| `onSubmit`    | `(values: any) => void` (optional)             | A callback function to be executed when the account link is submitted. It receives the entered values as input.               |
| `onCancel`    | `() => void` (optional)                        | A callback function to be executed when the account link view is canceled.   
| `messages`    | `[{ label: 'Hello' }]` (optional)                        | The content that appears during the linking process.                              |

## mountSelectSiteViewOptions <a href="#mountSelectSiteViewOptions" id="mountSelectSiteViewOptions"></a>

| Name       | Type                                    | Description                                                                                                               |
| ---------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `filter`   | `SelectSiteFilter: { [key: string]: string } ` (optional)                  | An object representing the filter criteria https://swch.github.io/slate/?javascript#get-merchant-site                                                                              |
| `multiple` | `boolean` (optional)                    | A boolean value indicating whether multiple site selections are allowed.                                                   |
| `view`     | `'list' \| 'carousel'` (optional)       | The view mode for the site selection, either `'list'` or `'carousel'`.                                                     |
| `onSubmit` | `(values: any) => void` (optional)      | A callback function to be executed when the selection is submitted. It receives the selected values as input.              |
| `onClose`  | `() => void` (optional)                 | A callback function to be executed when the selection view is closed.                                                      |
| `subscribe`| `(state: SelectSiteState) => void` (optional) | A callback function that subscribes to changes in the state of the site selection. It receives the updated state as input. |


### SelectSiteFilter

```js
      filter: {
        tags: 'prod,synthetic',
        top_hosts: 'apple.com,amazon.com,netflix.com,spotify.com,target.com,uber.com,venmo.com,walgreens.com,walmart.com',
        image_widths: '128,32'
      }
```

| Parameter            | Description                                    |
|----------------------|------------------------------------------------|
| ids / id (in path)   | Filter by specific IDs                         |
| id                   | Filter by a single ID                          |
| exclude_ids          | Exclude specific IDs                           |
| top_ids              | Filter by the top IDs                          |
| name_starts_with     | Filter by names that start with a specific string |
| hosts                | Filter by specific hosts                       |
| host                 | Filter by a single host                        |
| exclude_hosts        | Exclude specific hosts                         |
| top_hosts            | Filter by the top hosts                         |
| host_starts_with     | Filter by hosts that start with a specific string |
| tags                 | Filter by specific tags                         |
| image_widths         | Filter by specific image widths                 |
