package encoders

import (
	"hash/fnv"
)

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
