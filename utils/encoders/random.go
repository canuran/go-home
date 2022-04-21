package encoders

import (
	"math/rand"
	"time"
)

var random = rand.New(rand.NewSource(time.Now().UnixNano()))

func Random() *rand.Rand {
	return random
}
