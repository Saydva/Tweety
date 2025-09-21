# TweetyApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**tweetyControllerCreateTweet**](#tweetycontrollercreatetweet) | **POST** /tweety | Create a new tweety|
|[**tweetyControllerDeleteTweety**](#tweetycontrollerdeletetweety) | **DELETE** /tweety/{id} | |
|[**tweetyControllerGetAllTweeties**](#tweetycontrollergetalltweeties) | **GET** /tweety | Get all tweeties|

# **tweetyControllerCreateTweet**
> tweetyControllerCreateTweet(createTweetyDto)


### Example

```typescript
import {
    TweetyApi,
    Configuration,
    CreateTweetyDto
} from './api';

const configuration = new Configuration();
const apiInstance = new TweetyApi(configuration);

let createTweetyDto: CreateTweetyDto; //

const { status, data } = await apiInstance.tweetyControllerCreateTweet(
    createTweetyDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTweetyDto** | **CreateTweetyDto**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Tweety created successfully. |  -  |
|**400** | Invalid input data. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tweetyControllerDeleteTweety**
> tweetyControllerDeleteTweety()


### Example

```typescript
import {
    TweetyApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TweetyApi(configuration);

let id: string; //Tweety ID (default to undefined)

const { status, data } = await apiInstance.tweetyControllerDeleteTweety(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Tweety ID | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Tweety deleted successfully. |  -  |
|**401** | Unauthorized. |  -  |
|**404** | Tweety not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tweetyControllerGetAllTweeties**
> tweetyControllerGetAllTweeties()


### Example

```typescript
import {
    TweetyApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TweetyApi(configuration);

const { status, data } = await apiInstance.tweetyControllerGetAllTweeties();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of all tweeties. |  -  |
|**401** | Unauthorized. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

