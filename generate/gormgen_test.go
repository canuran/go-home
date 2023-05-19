package generate

import (
	"fmt"
	"github.com/canuran/go-home/generate/query"
	"github.com/canuran/go-home/utils/jsoner"
	"gorm.io/driver/sqlite"
	"gorm.io/gen"
	"gorm.io/gorm"
	"testing"
)

// TestGormGen 每次修改表后都要生成模型
// https://github.com/go-gorm/gen/blob/master/README.ZH_CN.md
func TestGormGen(t *testing.T) {
	g := gen.NewGenerator(gen.Config{
		OutPath: "query",
		Mode:    gen.WithoutContext | gen.WithDefaultQuery,
	})

	// 为Sqlite注册类型映射
	g.WithDataTypeMap(map[string]func(detailType gorm.ColumnType) (dataType string){
		"integer": func(detailType gorm.ColumnType) (dataType string) { return "int64" },
		"INTEGER": func(detailType gorm.ColumnType) (dataType string) { return "int64" },
	})

	db, _ := gorm.Open(sqlite.Open("../web.db"))
	g.UseDB(db)

	// Sqlite不能一次性生成所有表
	g.ApplyBasic(g.GenerateModel("config"),
		g.GenerateModel("user"))

	g.Execute()
}

func TestGenQuery(t *testing.T) {
	db, _ := gorm.Open(sqlite.Open("../../web.db"))
	u := query.Use(db).User
	users, _ := u.Where(u.ID.Lte(3)).Find()
	fmt.Println(jsoner.MarshalString(users))

	c := query.Use(db).Config
	configs, _ := c.Where(c.ID.Lte(3)).Find()
	fmt.Println(jsoner.MarshalString(configs))
}
