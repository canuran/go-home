package encoders

import (
	"crypto/md5"
	"encoding/hex"
	"hash/fnv"
)

func Md5(input []byte) []byte {
	bts := md5.Sum(input)
	return bts[:]
}

func Md5String(input []byte) string {
	return hex.EncodeToString(Md5(input))
}

func StringHash64(input string) int64 {
	hash := StringHashU64(input)
	return int64(hash >> 1)
}

func StringHashU64(src string) uint64 {
	return FNV1aHashU64([]byte(src))
}

func FNV1aHashU64(src []byte) uint64 {
	h64 := fnv.New64a()
	_, _ = h64.Write(src)
	return h64.Sum64()
}
