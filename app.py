from flask import Flask,render_template,url_for,request,json,jsonify
from jinja2 import Template
import sql_util
import datetime

app = Flask(__name__)


@app.route('/index')
def index():
    return render_template('index.html',title="laymini")
@app.route('/login')
def login():
    return render_template('login-1.html',title="laymini")

'''
@app.route('/')
def hello_world():
    # return 'Hello World!'
    return render_template('login-1.html',title="人口普查")
'''

# @app.route('/top5_chart', methods=['GET'])
# def top5_chart():
#     '''
#     1、获取历史数据
#     :return:
#     '''
#     x_data = []
#     y_data = []
#     result = sql_util.query_top5()
#     # print(result)
#     for a, b in result:
#         x_data.append(a)
#         y_data.append(b)
#     return jsonify({'x_data': x_data, 'y_data': y_data})
#
# @app.route('/min_chart', methods=['GET'])
# def min_chart():
#     '''
#     1、获取历史数据
#     :return:
#     '''
#     x_data = []
#     y1_data = []
#     y2_data = []
#     y3_data = []
#
#     result = sql_util.query_min()
#     for a, b, c, d in result:
#         # print(a,b,c)
#         #print(a.strftime('%Y-%m-%d'), b, c)
#         x_data.append(a)
#         y1_data.append(b)
#         y2_data.append(c)
#         y3_data.append(d)
#     return jsonify({'x_data': x_data, 'y1_data': y1_data, 'y2_data': y2_data,'y3_data':y3_data})
#
# @app.route('/edu_chart', methods=['GET'])
# def edu_chart():
#     '''
#     1、获取历史数据
#     :return:
#     '''
#     x_data = []
#     result = sql_util.query_edu()
#     for a, b in result:
#         # print(a,b,c)
#         #print(a.strftime('%Y-%m-%d'), b, c)
#         x_data.append({'name': a, 'value': b})
#     return jsonify({'x_data': x_data})
#
# @app.route('/map_chart', methods=['GET'])
# def map_chart():
#     '''
#     1、获取历史数据
#     :return:
#     '''
#     # var map_chart_data = [{'name': '上海', 'value': 318}, {'name': '云南', 'value': 162}];
#     x_data = []
#     result = sql_util.query_map()
#     for a, b in result:
#         # print(a,b,c)
#         #print(a.strftime('%Y-%m-%d'), b, c)
#         x_data.append({'name': a, 'value': b})
#     return jsonify({'x_data': x_data})
#
# @app.route('/cloud_chart', methods=[ 'GET'])
# def cloud_chart():
#     '''
#     1、获取累计数据
#     2、组装list
#     :return:
#     '''
#     x_data = []
#     result = sql_util.query_cloud()
#     # sentence = ''
#     for search_str, num in result:
#         # sentence = sentence + ',' + search_str
#         tags = jieba.analyse.extract_tags(search_str, topK=30, withWeight=True)
#         for k, v in tags:
#             if not str.isdigit(k):
#             # print(k, v)
#                 x_data.append({'name': k, 'value': v})
#     return jsonify({'x_data': x_data})

#==================================展示页面=============================================
#学科竞赛
@app.route('/contest_show', methods=['GET'])
def contest_show():
    page_num=request.values.get('page')
    page_size=request.values.get('limit')
    result,count = sql_util.contest_show(int(page_num),int(page_size))
    data=[]
    # print(result)
    for item in result:
        data.append({'id': item[0], 'year': item[1], 'name_contest': item[2], 'host_contest': item[3], 'classes': item[4],'level_contest': item[5], 'obtain_contest': item[6], 'time': item[7],'production':item[8],'teacher':item[9],'leader':item[10],'leader_major':item[11],'team':item[12],'prove':item[13]})
    return jsonify({'code':0,'msg':"",'count':count,'data':data})

#专利申请
@app.route('/patent_show', methods=['GET'])
def patent_show():
    page_num=request.values.get('page')
    page_size=request.values.get('limit')
    result,count = sql_util.patent_show(int(page_num),int(page_size))
    data=[]
    # print(result)
    for item in result:
        data.append({'id': item[0], 'year': item[1], 'name': item[2], 'number': item[3], 'type': item[4],'time': item[5], 'people': item[6], 'major': item[7],'prove':item[8]})
    return jsonify({'code':0,'msg':"",'count':count,'data':data})

#学术论文
@app.route('/paper_show', methods=['GET'])
def paper_show():
    page_num=request.values.get('page')
    page_size=request.values.get('limit')
    result,count = sql_util.paper_show(int(page_num),int(page_size))
    data=[]
    # print(result)
    for item in result:
        data.append({'id': item[0], 'year': item[1], 'name': item[2], 'magazine': item[3], 'magazine_num': item[4],'author': item[5], 'major': item[6], 'major': item[7],'prove':item[8]})
    return jsonify({'code':0,'msg':"",'count':count,'data':data})

#课题申报
@app.route('/issue_show', methods=['GET'])
def issue_show():
    page_num=request.values.get('page')
    page_size=request.values.get('limit')
    result,count = sql_util.issue_show(int(page_num),int(page_size))
    data=[]
    # print(result)
    for item in result:
        data.append({'id': item[0], 'year': item[1], 'number': item[2], 'name': item[3], 'type': item[4],'people': item[5], 'major': item[6], 'member': item[7],'teacher':item[8],'prove':item[9]})
    return jsonify({'code':0,'msg':"",'count':count,'data':data})

#创业项目
@app.route('/business_show', methods=['GET'])
def business_show():
    page_num=request.values.get('page')
    page_size=request.values.get('limit')
    result,count = sql_util.business_show(int(page_num),int(page_size))
    data=[]
    # print(result)
    for item in result:
        data.append({'id': item[0], 'year': item[1], 'company': item[2], 'people': item[3], 'address': item[4],'code': item[5], 'major': item[6], 'prove': item[7]})
    return jsonify({'code':0,'msg':"",'count':count,'data':data})



#===================================数据搜索=============================================
#学科竞赛_搜索
@app.route('/contest_search', methods=['POST'])
def contest_search():
    search_string=request.values.get('search_string')
    result = sql_util.contest_search(search_string)
    data=[]
    # print(result)
    for item in result:
        data.append({'id': item[0], 'year': item[1], 'name_contest': item[2], 'host_contest': item[3], 'classes': item[4],'level_contest': item[5], 'obtain_contest': item[6], 'time': item[7],'production':item[8],'teacher':item[9],'leader':item[10],'leader_major':item[11],'team':item[12],'prove':item[13]})
    return jsonify({'code':0,'msg':"",'data':data})

#专利申请_搜索
@app.route('/patent_search', methods=['POST'])
def patent_search():
    search_string=request.values.get('search_string')
    result = sql_util.patent_search(search_string)
    data=[]
    # print(result)
    for item in result:
        data.append({'id': item[0], 'year': item[1], 'name': item[2], 'number': item[3], 'type': item[4],'time': item[5], 'people': item[6], 'major': item[7],'prove':item[8]})
    return jsonify({'code':0,'msg':"",'data':data})

#学术论文_搜索
@app.route('/paper_search', methods=['POST'])
def paper_search():
    search_string=request.values.get('search_string')
    result = sql_util.paper_search(search_string)
    data=[]
    # print(result)
    for item in result:
        data.append({'id': item[0], 'year': item[1], 'name': item[2], 'magazine': item[3], 'magazine_num': item[4],'author': item[5], 'major': item[6], 'major': item[7],'prove':item[8]})
    return jsonify({'code':0,'msg':"",'data':data})

#课题申报_搜索
@app.route('/issue_search', methods=['POST'])
def issue_search():
    search_string=request.values.get('search_string')
    result = sql_util.issue_search(search_string)
    data=[]
    # print(result)
    for item in result:
        data.append({'id': item[0], 'year': item[1], 'number': item[2], 'name': item[3], 'type': item[4],'people': item[5], 'major': item[6], 'member': item[7],'teacher':item[8],'prove':item[9]})
    return jsonify({'code':0,'msg':"",'data':data})

#创业项目_搜索
@app.route('/business_search', methods=['POST'])
def business_search():
    search_string=request.values.get('search_string')
    result = sql_util.business_search(search_string)
    data=[]
    # print(result)
    for item in result:
        data.append({'id': item[0], 'year': item[1], 'company': item[2], 'people': item[3], 'address': item[4],'code': item[5], 'major': item[6], 'prove': item[7]})
    return jsonify({'code':0,'msg':"",'data':data})

#==================================数据删除=============================================
#专利删除
@app.route('/patent_delete', methods=['POST'])
def patent_delete():
    delete_id=request.values.get('delete_id')
    print("## delete_id:"+delete_id)
    result = sql_util.patent_delete(delete_id)
    data=[]
    # print(result)
    data.append({'isDelete': result}) # 返回是否被删除,1=是,0=否;
    return jsonify({'code':0,'msg':"",'data':data})

#==================================登录相关=============================================
#登录验证
@app.route('/loginCheck', methods=['POST'])
def loginCheck():
    username=request.values.get('username')
    password=request.values.get('password')
    result = sql_util.loginCheck(username,password)
    print(result[0])
    print("## username:"+username+"进行登录")
    # data.append({'isPermission': result[0][0]}) # 返回是否准许进入,1=是,0=否;
    return jsonify({'code':0,'msg':"",'data':{'isPermission': result[0][0]}})

'''
#专利修改 
@app.route('/patent_update', methods=['POST'])
def patent_update():
    # update_id=request.values.get('id') 获取到每一个字段以及id
    print("## updated_id:"+id)
    result = sql_util.patent_delete(a,b,c) # 每个字段传进去
    data=[]
    # print(result)
    data.append({'isDelete': result}) # 返回是否被更新成功,1=是,0=否;
    return jsonify({'code':0,'msg':"",'data':data})
    '''

if __name__ == '__main__':
    app.run()
