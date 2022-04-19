package config

import (
	"context"
	"fmt"
	"testing"
)

func TestWithDB(t *testing.T) {
	ctx := context.Background()
	ctx = context.WithValue(ctx, dbKey(1), 123)
	ctx = context.WithValue(ctx, dbKey(1), 345)

	fmt.Println(ctx.Value(1))
	fmt.Println(ctx.Value(dbKey(1)))
}
