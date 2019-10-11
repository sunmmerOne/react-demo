import Mock from 'mockjs'
const { Random } = Mock;
// 使用 Mock
Mock.mock(/demo/, {
    'list|10': [{
        'id|+1': 1,
        'email': '@email',
        'name': '@name',
        'age|10-40': 0,
        'address': () => (Random.province() + Random.city() + Random.county()),
    }],
});

