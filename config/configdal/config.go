package configdal

import (
	"context"
	"github.com/ewingtsai/go-web/config"
	"github.com/ewingtsai/go-web/generate/gormgen/model"
	"github.com/ewingtsai/go-web/generate/gormgen/query"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

func GetConfig(ctx context.Context, configKey string) (*model.Config, error) {
	db := config.GetDB(ctx)
	c := query.Use(db).Config
	do, err := c.Where(c.Config.Eq(configKey)).First()
	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}
	if err != nil {
		log.Errorf("GetConfig err:%s", err.Error())
		return nil, err
	}
	return do, nil
}

func SaveConfig(ctx context.Context, configDO *model.Config) error {
	if configDO == nil || len(configDO.Config) < 1 {
		return nil
	}
	db := config.GetDB(ctx)
	c := query.Use(db).Config
	err := c.Clauses(config.ConflictUpdateAll).Create(configDO)
	if err != nil {
		log.Errorf("SaveConfig err:%s", err.Error())
		return err
	}
	return nil
}

func UpdateConfigNotEmpty(ctx context.Context, configDO *model.Config) error {
	if configDO == nil || len(configDO.Config) < 1 {
		return nil
	}
	db := config.GetDB(ctx)
	c := query.Use(db).Config
	_, err := c.Where(c.Config.Eq(configDO.Config)).
		Updates(configDO)
	if err != nil {
		log.Errorf("UpdateConfigNotEmpty err:%s", err.Error())
		return err
	}
	return nil
}
