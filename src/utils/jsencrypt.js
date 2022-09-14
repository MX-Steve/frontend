import JSEncrypt from 'jsencrypt' //  引入非对称 RSA 加密工具
 
// 密钥对生成 http://web.chacuo.net/netrsakeypair
 
const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnzxG+gYdhqvuyt1PA0oYVikLBb5J03EKULqxUA7ibOPjzhyBdfU5+dsDDeh5EZSoamj0QrStG/WvmEu91iCgIuapPu1xfMwRc7KE6xfNjJpKf/ofcW3MWT0FW0cm9oxhPivxr1NZZXk9fff/yYd7WH1TF0bkfjoW/V7EbexPzrQIDAQAB'
const privateKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKfPEb6Bh2Gq+7K3U8DShhWKQsFvknTcQpQurFQDuJs4+POHIF19Tn52wMN6HkRlKhqaPRCtK0b9a+YS73WIKAi5qk+7XF8zBFzsoTrF82Mmkp/+h9xbcxZPQVbRyb2jGE+K/GvU1lleT199//Jh3tYfVMXRuR+Ohb9XsRt7E/OtAgMBAAECgYAzcYR0DYtuQpeUyyTO2PsoAVHDsSuJzbhPaxuDSfy/ATE4nvUqE+8LT+Z6RqaeuxC0RRJxWVUKF0iLqMRmGI6E1t0mgNjq7bDVeR6EacZXHEMDjDyPhkq4qM/u9k1aJ0pA0/ogEUpVfzys0ym1+tDViEL3PTghWGC7+9VaKM/zoQJBAN35cLP+oK3+KtGPFp/mD8mASA9gB8w+eBmymNpwBFNEpQjVbYa0H2zNIcW11nAz6GXFIdA1U3DI5+mbAZNlgLUCQQDBiBrTvi2/7wDOtUH/3gqclsycFsWTn7cgNQdBXWnLHQu9Z0A24xrlhC1V8JGy93Cl3kpwm5rf38aKI9ZRuBoZAkEAu+TwnLwV4RI7xoV7nkBM7sEyvikIkL/0Q7RlJMobLyz1EeQvwQ1paFy/kK8aZIHb34Gd3LO2/MpjXN/D1rPd3QJARJz/feCoEasnqyGCI7fSJVAlfJVqOPtgDnAegWMf9d33YpAvqQX9bC/fbt+amEu3yWa1F5VjZEnO9vzbqB9QSQJAHyBU6NzjEfJSWR6lNkGZ9q9sWEfsLdT833l6H/88wvN8deMm36RbgB5Vkfq8zs/SQYRTMTpWkMm4HZYQ3WcVxA=='
 
// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}
 
// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}