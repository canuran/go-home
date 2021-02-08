package common

import (
	"github.com/ewingtsai/go-web/utils/converter"
	"github.com/ewingtsai/go-web/utils/strutil"
	"gorm.io/gorm"
	"strings"
)

func WhereIfTrue(db *gorm.DB, value bool, where string, arg interface{}) *gorm.DB {
	if value && db != nil && len(where) > 0 {
		return db.Where(where, arg)
	}
	return db
}

func WhereIfPresent(db *gorm.DB, where string, arg interface{}) *gorm.DB {
	return WhereIfTrue(db, arg != nil, where, arg)
}

func WhereIfGtZero(db *gorm.DB, where string, arg interface{}) *gorm.DB {
	return WhereIfTrue(db, converter.Float64ify(arg) > 0, where, arg)
}

func WhereIfHasLen(db *gorm.DB, where string, arg string) *gorm.DB {
	return WhereIfTrue(db, len(arg) > 0, where, arg)
}

func WhereIfHasText(db *gorm.DB, where string, arg string) *gorm.DB {
	return WhereIfTrue(db, strutil.HasText(arg), where, arg)
}

func LikeStartWith(value string) string {
	return RemoveWildcard(value) + "%"
}

func RemoveWildcard(value string) string {
	value = strings.ReplaceAll(value, "%", "")
	return strings.ReplaceAll(value, "_", "")
}
