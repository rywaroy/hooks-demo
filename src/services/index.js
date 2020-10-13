import Mock from 'mockjs';

export function getStudentList(params = {}) {
  const { name, age, gender, current = 1, pageSize = 10 } = params;
  console.log(`发起请求，页码：${current}`);
  const mockData = Mock.mock({
    status: 200,
    total: 50,
    [`data|${pageSize}`]: [
      {
        name: name ? name : '@cname',
        age: age ? age : '@integer(10, 20)',
        gender: gender ? gender : '@cword("男女")',
        id: '@id()',
      },
    ],
  });
  return Promise.resolve(mockData);
}
