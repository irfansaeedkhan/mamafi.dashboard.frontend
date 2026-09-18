import { InternalAPIBaseURL } from '@/constants/base-urls';
import { AuthTokens, setAuthTokens } from '@/lib/auth';
import { customLog } from '../custom-log';
const validateAccessTokenRoute = `${InternalAPIBaseURL}/auth/check-token`;
const validateRefreshTokenRoute = `${InternalAPIBaseURL}/auth/refresh-token`;

type AccessTokenValidationResponse = {
  access_token_valid: boolean;
  generate_access_token: boolean;
};
export async function validateAccessToken(authTokens: AuthTokens): Promise<AccessTokenValidationResponse> {
  try {
    const res = await fetch(validateAccessTokenRoute, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authTokens.access_token}`,
      },
    });

    //Token is valid not need to create refresh token
    if (res.status == 200 || res.status == 304) {
      return {
        access_token_valid: true,
        generate_access_token: false,
      };
    } else if (res.status == 401) {
      return {
        access_token_valid: false,
        generate_access_token: true,
      };
    }
    return {
      access_token_valid: false,
      generate_access_token: false,
    };
  } catch (error: any) {
    console.log('Access Error ', error);
    console.log('Access ', error.status);
    return {
      access_token_valid: false,
      generate_access_token: false,
    };
  }
}

export async function validateRefreshToken(authTokens: AuthTokens): Promise<boolean> {
  try {
    const res: Response = await fetch(validateRefreshTokenRoute, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authTokens.refresh_token}`,
      },
    });

    // response

    if (res.status === 401) {
      return false;
    }

    const text = await res.text();
    if (!text) {
      return false;
    }

    const res_data = JSON.parse(text);

    if (!res_data?.accessToken || !res_data?.refreshToken) {
      return false;
    }

    // Setting the refresh token in the cookie
    await setAuthTokens({
      access_token: res_data.accessToken,
      refresh_token: res_data.refreshToken,
    });
    return true;
  } catch (error: any) {
    console.log('valdating refresh token ', error);
    return false;
  }
}

// Validate Tokens from API
export async function validateTokens(authTokens: AuthTokens): Promise<boolean> {
  try {
    // Check if tokens are present
    if (!authTokens.access_token || !authTokens.refresh_token) {
      return false;
    }

    const access_token_valid = await validateAccessToken(authTokens);
    if (access_token_valid.access_token_valid) {
      return true;
    } else if (
      !access_token_valid.access_token_valid &&
      !access_token_valid.generate_access_token
    ) {
      return false;
    }
    // Validate Refresh Token
    const refresh_token_valid = await validateRefreshToken(authTokens);

    if (!refresh_token_valid) {
      await setAuthTokens({
        access_token: '',
        refresh_token: '',
      });
      return false;
    }
    return true;
  } catch (err: any) {
    console.log('Error validating token ', err);
    customLog(['development'], err);
    return false;
  }
}
