import Mock from 'mockjs';

export function getStudentList(params = {}) {
  const { name, age, gender } = params;
  const mockData = Mock.mock({
    status: 200,
    'data|3-6': [
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
