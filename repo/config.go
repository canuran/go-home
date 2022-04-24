package repo

import (
	"context"
	"github.com/ewingtsai/go-home/config"
	"github.com/ewingtsai/go-home/generate/model"
	"github.com/ewingtsai/go-home/generate/query"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

func GetConfig(ctx context.Context, configKey string) (*model.Config, error) {
	db, ctx := config.ApplyDB(ctx)
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
	db, ctx := config.ApplyDB(ctx)
	c := query.Use(db).Config
	err := c.Clauses(config.ConflictUpdateAll).Create(configDO)
	if err != nil {
		log.Errorf("SaveConfig err:%s", err.Error())
		return err
	}
	return nil
}

func UpdateConfig(ctx context.Context, configDO *model.Config) error {
	if configDO == nil || len(configDO.Config) < 1 {
		return nil
	}
	db, ctx := config.ApplyDB(ctx)
	c := query.Use(db).Config
	_, err := c.Where(c.Config.Eq(configDO.Config)).
		Updates(configDO)
	if err != nil {
		log.Errorf("UpdateConfig err:%s", err.Error())
		return err
	}
	return nil
}
