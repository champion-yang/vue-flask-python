import datetime

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 初始化数据库连接
# max_overflow 最大连接数
engine = create_engine("mysql+mysqlconnector://root:15835007400@127.0.0.1:3306/dingai?charset=utf8", max_overflow=5)
# 创建DBSession连接类型
DBSession = sessionmaker(bind=engine)
session = DBSession()
# 数据库表基类
Base = declarative_base()


# 管理员表
class Admins(Base):
    __tablename__ = 'admins'
    id = Column(Integer, primary_key=True)  # id主键
    username = Column(String(32), nullable=False)
    password = Column(String(32), nullable=False)

    def __repr__(self):
        return '<Admins (name=%s)>' % self.username


# 用户表
class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)  # id主键
    username = Column(String(32), nullable=False)
    password = Column(String(32), nullable=False)

    # 显示属性
    def __repr__(self):
        return '<Admins (name=%s)>' % self.username


# 资产表
class Property(Base):
    __tablename__ = 'property'  # 表名
    id = Column(Integer, primary_key=True)  # id主键
    code = Column(String(30))
    name = Column(String(30))
    type = Column(Integer)
    size = Column(String(30))  # 规格型号
    unit = Column(String(10))  # 计量单位
    price = Column(Integer)
    company = Column(String(20))
    department = Column(String(20))
    datetime = Column(DateTime, default=datetime.datetime.now())
    user = Column(String(20))
    admin_id = Column(Integer, ForeignKey("admins.id"))
    area = Column(String(20))
    life = Column(String(20))
    source = Column(Integer)
    info = Column(String(200))
    img = Column(String(200))

    def __repr__(self):
        return '<Property (name=%s)>' % self.name


# 维保信息表
class Maintenance(Base):
    __tablename__ = "maintenance"
    id = Column(Integer, primary_key=True)  # id主键
    property_id = Column(Integer, ForeignKey("property.id"))
    name = Column(String(20))
    person_name = Column(String(20))
    person_tel = Column(String(11))
    life = Column(String(20))
    info = Column(String(20))


if __name__ == "__main__":
    Base.metadata.create_all(engine)

# 创建session对象:

# # 创建新User对象:
# new_user = Users(id='5', name='Bob')
# # 添加到session:
# session.add(new_user)
# # 提交即保存到数据库:
# session.commit()
# # 关闭session:
# session.close()
