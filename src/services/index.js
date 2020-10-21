import Mock from 'mockjs';

export function getStudentList(params = {}) {
  const { name, age, gender, current = 1, pageSize = 10, classes } = params;
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
        'classes|1': classes ? [classes] : ['三年1班', '三年2班', '三年3班']
      },
    ],
  });
  return Promise.resolve(mockData);
}

export function addStudent(params) {
  console.log('新增学生', params);
  return Promise.resolve({
    status: 200,
  });
}

export function updateStudent(params) {
  console.log('编辑学生', params);
  return Promise.resolve({
    status: 200,
  });
}

export function getClasses() {
  return Promise.resolve(['三年1班', '三年2班', '三年3班']);
}
