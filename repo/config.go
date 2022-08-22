package repo

import (
	"context"
	"github.com/canuran/go-home/config"
	"github.com/canuran/go-home/generate/model"
	"github.com/canuran/go-home/generate/query"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

func GetConfig(ctx context.Context, configKey string) (*model.Config, error) {
	db, ctx := config.GetDB(ctx)
	c := query.Use(db).Config
	do, err := c.Where(c.Config.Eq(configKey)).First()
	if err == gorm.ErrRecordNotFound {
		return nil, nil
	}
	if err != nil {
		logrus.Errorf("GetConfig err:%s", err.Error())
		return nil, err
	}
	return do, nil
}

func SaveConfig(ctx context.Context, configDO *model.Config) error {
	if configDO == nil || len(configDO.Config) < 1 {
		return nil
	}
	db, ctx := config.GetDB(ctx)
	c := query.Use(db).Config
	err := c.Clauses(config.ConflictUpdateAll).Create(configDO)
	if err != nil {
		logrus.Errorf("SaveConfig err:%s", err.Error())
		return err
	}
	return nil
}

func UpdateConfig(ctx context.Context, configDO *model.Config) error {
	if configDO == nil || len(configDO.Config) < 1 {
		return nil
	}
	db, ctx := config.GetDB(ctx)
	c := query.Use(db).Config
	_, err := c.Where(c.Config.Eq(configDO.Config)).
		Updates(configDO)
	if err != nil {
		logrus.Errorf("UpdateConfig err:%s", err.Error())
		return err
	}
	return nil
}
