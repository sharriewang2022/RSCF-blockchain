import { GithubType } from '../interface';
import request from '../request';

/* 用户列表 */
export const getUserList = (searchName: string) =>
  request<GithubType>({
    url: `/api/search/users?q=${searchName}`,
    method: 'get',
  });

  https://github.com/wang1xiang/create-vct/blob/9c5f03e71f6233f42004826c992bf53ef3920407/react-project/src/api/feature/app.ts