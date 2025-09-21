# AuthRefreshApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authRefreshControllerRefreshToken**](#authrefreshcontrollerrefreshtoken) | **POST** /auth-refresh/refresh | Refresh Authentication Token|

# **authRefreshControllerRefreshToken**
> authRefreshControllerRefreshToken(refreshTokenDto)


### Example

```typescript
import {
    AuthRefreshApi,
    Configuration,
    RefreshTokenDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthRefreshApi(configuration);

let refreshTokenDto: RefreshTokenDto; //

const { status, data } = await apiInstance.authRefreshControllerRefreshToken(
    refreshTokenDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **refreshTokenDto** | **RefreshTokenDto**|  | |


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
|**201** | Token refreshed successfully. |  -  |
|**400** | Invalid refresh token. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

