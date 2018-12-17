from bottle import run,template,route,error,static_file,request
import feedparser


@route('/getNews')
def get_news():
    rss = request.query["feed"]
    feed = feedparser.parse(rss)
    new_obj = feed["entries"]
    final_dict = {}
    for elem in new_obj:
        temp_dict = {}
        temp_dict[elem["title"]] = elem["link"]
        final_dict.update(temp_dict)
    return final_dict


@route('/static/<filename:re:.*\.js>')
def js(filename):
    return static_file(filename, root='static')


@route('/static/<filename:re:.*\.css>')
def css(filename):
    return static_file(filename, root='static')


@route('/static/images/<filename:re:.*\.PNG>')
def image(filename):
    return static_file(filename, root='static\images')

@error(404)
def error_404(error):
    return "page not found!"

@route('/')
def index():
    return template("index.html", root='')


def main():
    run(host='localhost', port=7000)


if __name__ == '__main__':
    main()

