package gormgen

import (
	"fmt"
	"github.com/ewingtsai/go-web/generate/gormgen/query"
	"github.com/ewingtsai/go-web/utils/jsoner"
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
		Mode:    gen.WithoutContext,
	})

	// Sqlite必须注册类型映射
	g.WithDataTypeMap(map[string]func(detailType string) (dataType string){
		"integer":  func(detailType string) (dataType string) { return "int64" },
		"real":     func(detailType string) (dataType string) { return "float64" },
		"text":     func(detailType string) (dataType string) { return "string" },
		"datetime": func(detailType string) (dataType string) { return "time.Time" },
		"INTEGER":  func(detailType string) (dataType string) { return "int64" },
		"REAL":     func(detailType string) (dataType string) { return "float64" },
		"TEXT":     func(detailType string) (dataType string) { return "string" },
		"DATETIME": func(detailType string) (dataType string) { return "time.Time" },
	})

	// Sqlite生成时不能带索引
	db, _ := gorm.Open(sqlite.Open("web_gen.db"))
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
	fmt.Println(jsoner.JsonMarshalString(users))

	c := query.Use(db).Config
	configs, _ := c.Where(c.ID.Lte(3)).Find()
	fmt.Println(jsoner.JsonMarshalString(configs))
}
