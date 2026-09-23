from __future__ import annotations

import html
import re
import sys
import unicodedata
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Flowable, Frame, KeepTogether, ListFlowable, ListItem,
    NextPageTemplate, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle,
)
from reportlab.platypus.tableofcontents import TableOfContents


ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'pdf' / 'completo.pdf'
PAGE_W, PAGE_H = A4
INK = colors.HexColor('#17292E')
MUTED = colors.HexColor('#596E72')
TEAL = colors.HexColor('#087E73')
TEAL_DARK = colors.HexColor('#075C56')
LIME = colors.HexColor('#B8F36B')
PALE = colors.HexColor('#E9F4F0')
PAPER = colors.HexColor('#FFFFFF')
CANVAS = colors.HexColor('#F3F6F3')
LINE = colors.HexColor('#DAE5E1')
AMBER = colors.HexColor('#E3A344')
RED = colors.HexColor('#B9584E')

DOCS = [
    ('00', 'Guía del paquete', 'Orientación para el curso', '00_LEEME.md'),
    ('01', 'Guion del instructor', 'Facilitación', '01_guion_instructor.md'),
    ('02', 'Apuntes del alumno', 'Conceptos esenciales', '02_apuntes_alumno.md'),
    ('03', 'Cuaderno de laboratorio', 'Prácticas guiadas', '03_laboratorio.md'),
    ('04', 'Soluciones y errores frecuentes', 'Apoyo del instructor', '04_soluciones_y_errores.md'),
    ('05', 'Glosario y chuleta', 'Consulta rápida', '05_glosario_chuleta.md'),
    ('06', 'Evaluación', 'Diagnóstico y repaso', '06_evaluacion.md'),
    ('07', 'Preparación previa', 'Puesta en marcha', '07_instalacion_previa.md'),
]


def register_fonts():
    fonts = Path(r'C:\Windows\Fonts')
    choices = {
        'Course': ['segoeui.ttf', 'arial.ttf'],
        'Course-Bold': ['segoeuib.ttf', 'arialbd.ttf'],
        'Course-Italic': ['segoeuii.ttf', 'ariali.ttf'],
        'Course-BoldItalic': ['segoeuiz.ttf', 'arialbi.ttf'],
        'Course-Mono': ['consola.ttf', 'cour.ttf'],
        'Course-MonoBold': ['consolab.ttf', 'courbd.ttf'],
    }
    for family, names in choices.items():
        file = next((fonts / name for name in names if (fonts / name).exists()), None)
        if file is None:
            raise FileNotFoundError(f'No encuentro una fuente para {family}')
        pdfmetrics.registerFont(TTFont(family, str(file)))
    pdfmetrics.registerFontFamily('Course', normal='Course', bold='Course-Bold', italic='Course-Italic', boldItalic='Course-BoldItalic')
    pdfmetrics.registerFontFamily('Course-Mono', normal='Course-Mono', bold='Course-MonoBold', italic='Course-Mono', boldItalic='Course-MonoBold')


register_fonts()

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name='Body', fontName='Course', fontSize=9.35, leading=14.0,
    textColor=INK, spaceAfter=6.5, splitLongWords=1,
))
styles.add(ParagraphStyle(
    name='ListBody', fontName='Course', fontSize=9.15, leading=12.8,
    textColor=INK, spaceAfter=0, splitLongWords=1,
))
styles.add(ParagraphStyle(
    name='SectionHeading', fontName='Course-Bold', fontSize=15.3, leading=19,
    textColor=TEAL_DARK, spaceBefore=15, spaceAfter=7, keepWithNext=True,
))
styles.add(ParagraphStyle(
    name='SubHeading', fontName='Course-Bold', fontSize=11.3, leading=14.5,
    textColor=INK, spaceBefore=11, spaceAfter=4.5, keepWithNext=True,
))
styles.add(ParagraphStyle(
    name='MinorHeading', fontName='Course-Bold', fontSize=9.8, leading=13,
    textColor=TEAL_DARK, spaceBefore=8, spaceAfter=3, keepWithNext=True,
))
styles.add(ParagraphStyle(
    name='Small', fontName='Course', fontSize=8.0, leading=11.1,
    textColor=MUTED, spaceAfter=4,
))
styles.add(ParagraphStyle(
    name='Quote', fontName='Course-Italic', fontSize=9.1, leading=13.3,
    textColor=TEAL_DARK, leftIndent=0, spaceAfter=0,
))
styles.add(ParagraphStyle(
    name='MonoBlock', fontName='Course-Mono', fontSize=7.7, leading=10.4,
    textColor=colors.HexColor('#E8F1ED'), splitLongWords=1,
))
styles.add(ParagraphStyle(
    name='Cell', fontName='Course', fontSize=7.5, leading=10.1,
    textColor=INK, spaceAfter=0,
))
styles.add(ParagraphStyle(
    name='CellHead', fontName='Course-Bold', fontSize=7.2, leading=9.2,
    textColor=PAPER, spaceAfter=0,
))
styles.add(ParagraphStyle(
    name='ChapterTOC', fontName='Course-Bold', fontSize=10.2, leading=15,
    textColor=INK, leftIndent=0, firstLineIndent=0, spaceBefore=3,
))
styles.add(ParagraphStyle(
    name='SectionTOC', fontName='Course', fontSize=8.2, leading=11.3,
    textColor=MUTED, leftIndent=14, firstLineIndent=0,
))


def norm(text: str) -> str:
    text = text.replace('\u00a0', ' ').replace('\u202f', ' ')
    text = text.translate(str.maketrans({'–': '-', '—': '-', '−': '-', '‑': '-', '→': '->', '←': '<-'}))
    text = text.replace('⚠️', 'ATENCION: ').replace('⚠', 'ATENCION: ').replace('✅', '[OK] ').replace('✔', '[OK] ')
    text = re.sub(r'[\U0001F000-\U0001FAFF\u2600-\u27BF\uFE0F\u200D]', '', text)
    return text


def slug(text: str) -> str:
    value = unicodedata.normalize('NFD', re.sub(r'<[^>]+>', '', text)).encode('ascii', 'ignore').decode('ascii').lower()
    value = re.sub(r'[^a-z0-9]+', '-', value).strip('-')
    return value or 'section'


def inline_markup(value: str) -> str:
    value = norm(value)
    code_tokens = []

    def hold_code(match):
        code_tokens.append(f'<font name="Course-Mono" color="#075C56">{html.escape(match.group(1))}</font>')
        return f'@@CODE{len(code_tokens)-1}@@'

    value = re.sub(r'`([^`]+)`', hold_code, value)
    value = html.escape(value, quote=False)
    value = re.sub(r'\[([^\]]+)\]\((https?://[^ )]+)(?:\s+"[^"]*")?\)', r'<link href="\2" color="#087E73">\1</link>', value)
    value = re.sub(r'\[([^\]]+)\]\(([^ )]+)(?:\s+"[^"]*")?\)', r'<link href="\2" color="#087E73">\1</link>', value)
    value = re.sub(r'\*\*(.+?)\*\*|__(.+?)__', r'<b>\1\2</b>', value)
    value = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)|(?<!_)_([^_]+)_(?!_)', r'<i>\1\2</i>', value)
    value = re.sub(r'(^|\s)(https?://[^\s<]+)', r'\1<link href="\2" color="#087E73">\2</link>', value)
    for i, token in enumerate(code_tokens):
        value = value.replace(f'@@CODE{i}@@', token)
    value = re.sub(r'\[([ xX])\] ', lambda m: '[X] ' if m.group(1).strip() else '[ ] ', value)
    return value


def table_cells(line: str) -> list[str]:
    text = line.strip().strip('|')
    return [cell.strip().replace('\\|', '|') for cell in re.split(r'(?<!\\)\|', text)]


def is_table_sep(line: str) -> bool:
    cells = table_cells(line)
    return bool(cells) and all(re.fullmatch(r':?-{3,}:?', cell.replace(' ', '')) for cell in cells)


def make_table(rows: list[list[str]], width: float):
    if not rows:
        return Spacer(1, 1)
    column_count = max(len(r) for r in rows)
    col_widths = [width / column_count] * column_count
    data = []
    for ri, row in enumerate(rows):
        row = row + [''] * (column_count - len(row))
        style = 'CellHead' if ri == 0 else 'Cell'
        data.append([Paragraph(inline_markup(v), styles[style]) for v in row])
    table = Table(data, colWidths=col_widths, repeatRows=1, hAlign='LEFT', splitByRow=1)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), TEAL_DARK),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [PAPER, colors.HexColor('#F1F6F3')]),
        ('GRID', (0, 0), (-1, -1), .45, LINE),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
    ]))
    return KeepTogether([Spacer(1, 4), table, Spacer(1, 8)])


def list_items(lines: list[str], width: float):
    roots = []
    stack = []
    for line in lines:
        match = re.match(r'^(\s*)([-+*]|\d+[.)])\s+(.*)$', line)
        if not match:
            continue
        indent = len(match.group(1).expandtabs(4))
        marker, text = match.group(2), match.group(3)
        ordered = marker[0].isdigit()
        while stack and indent < stack[-1]['indent']:
            stack.pop()
        if stack and indent == stack[-1]['indent'] and ordered != stack[-1]['ordered']:
            stack.pop()
        if not stack or indent > stack[-1]['indent']:
            node = {'indent': indent, 'ordered': ordered, 'items': []}
            if stack:
                parent = stack[-1]['items'][-1]
                parent['children'].append(node)
            else:
                roots.append(node)
            stack.append(node)
        item = {'text': text, 'marker': marker, 'children': []}
        stack[-1]['items'].append(item)

    def to_flowables(node, depth=0):
        result = []
        for item in node['items']:
            checkbox = re.match(r'^\[([ xX])\]\s+(.*)$', item['text'])
            content = ('[X] ' if checkbox and checkbox.group(1).strip() else '[ ] ' if checkbox else '') + (checkbox.group(2) if checkbox else item['text'])
            marker = item['marker'] if item['marker'][0].isdigit() else '-'
            result.append(ListLine(inline_markup(content), marker, depth))
            for child in item['children']:
                result.extend(to_flowables(child, depth + 1))
        return result

    result = []
    for node in roots:
        result.extend(to_flowables(node))
    return result


class ListLine(Flowable):
    def __init__(self, content, marker, depth=0):
        super().__init__(); self.marker=marker; self.depth=depth
        self.p=Paragraph(content,styles['ListBody']);self.spaceAfter=2.5
    def wrap(self,width,height):
        self.width=width;self.indent=min(self.depth*12,48)
        _,self.ph=self.p.wrap(width-self.indent-16,height);self.height=self.ph+2
        return width,self.height
    def draw(self):
        c=self.canv;c.setFillColor(TEAL if self.marker=='-' else MUTED);c.setFont('Course-Bold',7.5)
        c.drawString(self.indent,self.ph-9,self.marker)
        self.p.drawOn(c,self.indent+14,0)


class Callout(Flowable):
    def __init__(self, content):
        super().__init__()
        self.p = Paragraph(inline_markup(content), styles['Quote'])

    def wrap(self, width, height):
        self.width = width
        _, self.ph = self.p.wrap(width - 28, height)
        self.height = self.ph + 22
        return width, self.height

    def draw(self):
        self.canv.setFillColor(PALE)
        self.canv.roundRect(0, 0, self.width, self.height, 8, fill=1, stroke=0)
        self.canv.setFillColor(TEAL)
        self.canv.roundRect(0, 0, 4, self.height, 2, fill=1, stroke=0)
        self.p.drawOn(self.canv, 14, 11)


class CodeBlock(Flowable):
    def __init__(self, lines):
        super().__init__()
        value = '<br/>'.join(html.escape(norm(line), quote=False).replace(' ', '&nbsp;') or '&nbsp;' for line in lines)
        self.p = Paragraph(value, styles['MonoBlock'])

    def wrap(self, width, height):
        self.width = width
        _, self.ph = self.p.wrap(width - 24, height)
        self.height = self.ph + 20
        return width, self.height

    def draw(self):
        self.canv.setFillColor(INK)
        self.canv.roundRect(0, 0, self.width, self.height, 7, fill=1, stroke=0)
        self.p.drawOn(self.canv, 12, 10)


class Rule(Flowable):
    def __init__(self):
        super().__init__(); self.height = 16
    def wrap(self, width, height): self.width = width; return width, self.height
    def draw(self):
        self.canv.setStrokeColor(LINE); self.canv.setLineWidth(.7); self.canv.line(0, 8, self.width, 8)


def center_text(c, text, x, y, font='Course-Bold', size=9, color=INK):
    c.setFont(font, size); c.setFillColor(color); c.drawCentredString(x, y, text)


class Diagram(Flowable):
    def __init__(self, kind, caption=''):
        super().__init__(); self.kind = kind; self.caption = caption; self.height = 126
    def wrap(self, width, height): self.width = width; return width, self.height
    def box(self, x, y, w, h, title, sub='', fill=PALE, edge=TEAL):
        c = self.canv
        c.setFillColor(fill); c.setStrokeColor(edge); c.setLineWidth(.8); c.roundRect(x, y, w, h, 8, fill=1, stroke=1)
        center_text(c, title, x + w/2, y + h*.61, 'Course-Bold', 8.1, INK)
        if sub: center_text(c, sub, x + w/2, y + h*.3, 'Course', 6.5, MUTED)
    def arrow(self, x1, y1, x2, y2, color=TEAL):
        c = self.canv; c.setStrokeColor(color); c.setFillColor(color); c.setLineWidth(1.5); c.line(x1,y1,x2,y2)
        c.saveState(); c.translate(x2,y2); import math; angle=math.atan2(y2-y1,x2-x1); c.rotate(math.degrees(angle)); p=c.beginPath(); p.moveTo(0,0); p.lineTo(-6,3); p.lineTo(-6,-3); p.close(); c.drawPath(p,fill=1,stroke=0); c.restoreState()
    def draw(self):
        c=self.canv; w=self.width; y=46; gap=12; margin=5
        if self.kind == 'architecture':
            bw=(w-2*margin-2*gap)/3
            xs=[margin,margin+bw+gap,margin+2*(bw+gap)]
            self.box(xs[0],y,bw,54,'MODELO','razona y propone',colors.HexColor('#EDF2FF'),colors.HexColor('#788BCC'))
            self.box(xs[1],y,bw,54,'HARNESS','contexto + control',PALE,TEAL)
            self.box(xs[2],y,bw,54,'HERRAMIENTAS','archivos · terminal · MCP',colors.HexColor('#FFF3DD'),AMBER)
            self.arrow(xs[0]+bw+1,y+27,xs[1]-2,y+27); self.arrow(xs[1]+bw+1,y+27,xs[2]-2,y+27)
            c.setFillColor(RED); c.roundRect(margin,y-26,w-2*margin,16,5,fill=1,stroke=0)
            center_text(c,'PERMISOS, APROBACIONES Y LIMITES DE EJECUCION',w/2,y-21,'Course-Bold',6.5,PAPER)
            self.caption='El modelo razona; el harness organiza el trabajo y delimita qué acciones puede ejecutar.'
        elif self.kind == 'loop':
            bw=(w-2*margin-3*gap)/4; xs=[margin+i*(bw+gap) for i in range(4)]
            labels=[('1','PLANIFICA'),('2','ACTUA'),('3','OBSERVA'),('4','REVISA')]
            fills=[colors.HexColor('#EDF2FF'),PALE,colors.HexColor('#FFF3DD'),colors.HexColor('#EAF4E9')]
            for i,(n,label) in enumerate(labels):
                self.box(xs[i],y,bw,50,f'{n} · {label}','paso observable',fills[i],[TEAL,TEAL,AMBER,TEAL][i])
                if i<3:self.arrow(xs[i]+bw+1,y+25,xs[i+1]-2,y+25)
            c.setStrokeColor(TEAL);c.setLineWidth(1.25);c.line(xs[3]+bw/2,y-1,xs[3]+bw/2,18);c.line(xs[3]+bw/2,18,xs[0]+bw/2,18);self.arrow(xs[0]+bw/2,18,xs[0]+bw/2,y-1)
            self.caption='El agente repite el ciclo hasta terminar, pedir una decisión o alcanzar un límite.'
        elif self.kind == 'permissions':
            bw=(w-2*margin-2*gap)/3;xs=[margin,margin+bw+gap,margin+2*(bw+gap)]
            self.box(xs[0],y,bw,52,'ESPACIO DE TRABAJO','zona de la práctica',PALE,TEAL)
            self.box(xs[1],y,bw,52,'APROBACION','parar y revisar',colors.HexColor('#FFF3DD'),AMBER)
            self.box(xs[2],y,bw,52,'FUERA DEL ALCANCE','no autorizar por defecto',colors.HexColor('#FBECE9'),RED)
            self.arrow(xs[0]+bw+1,y+26,xs[1]-2,y+26,AMBER);self.arrow(xs[1]+bw+1,y+26,xs[2]-2,y+26,RED)
            self.caption='Empieza con una carpeta de prueba. Una solicitud de aprobación es una decisión, no un trámite.'
        elif self.kind == 'route':
            bw=(w-2*margin-4*gap)/5;xs=[margin+i*(bw+gap) for i in range(5)]
            labels=['Entender','Probar','Limitar','Verificar','Aplicar']
            subs=['modelo + agente','datos ficticios','permisos','fuentes + cambios','criterio propio']
            for i in range(5):
                self.box(xs[i],y,bw,52,labels[i],subs[i],[colors.HexColor('#EDF2FF'),PALE,colors.HexColor('#FFF3DD'),PALE,colors.HexColor('#EAF4E9')][i],TEAL if i!=2 else AMBER)
                if i<4:self.arrow(xs[i]+bw+1,y+26,xs[i+1]-2,y+26)
            self.caption='Ruta de aprendizaje: del concepto a una práctica controlada y revisada.'
        elif self.kind == 'prompt':
            bw=(w-2*margin-3*gap)/4;xs=[margin+i*(bw+gap) for i in range(4)]
            labels=[('CONTEXTO','qué archivos y datos'),('TAREA','qué necesitas'),('FORMATO','cómo entregar'),('LIMITES','qué no cambiar')]
            for i,(title,sub) in enumerate(labels):self.box(xs[i],y,bw,52,title,sub,[colors.HexColor('#EDF2FF'),PALE,colors.HexColor('#FFF3DD'),colors.HexColor('#FBECE9')][i],[TEAL,TEAL,AMBER,RED][i])
            self.caption='Un encargo claro da contexto, define una tarea y un resultado, y explicita los límites.'
        if self.caption:
            p=Paragraph(self.caption,styles['Small']);pw,ph=p.wrap(w-10,20);p.drawOn(c,5,2)


class ChapterBand(Flowable):
    def __init__(self, number, title, label):
        super().__init__(); self.number=number; self.title=norm(title); self.label=label; self.height=91
    def wrap(self, width, height): self.width=width; return width,self.height
    def draw(self):
        c=self.canv; c.setFillColor(PALE); c.roundRect(0,0,self.width,self.height,10,fill=1,stroke=0)
        c.setFillColor(TEAL); c.roundRect(0,0,5,self.height,2,fill=1,stroke=0)
        c.setFont('Course-MonoBold',7.4);c.setFillColor(TEAL_DARK);c.drawString(18,self.height-22,f'PARTE {self.number}  /  {self.label.upper()}')
        c.setFont('Course-Bold',19);c.setFillColor(INK)
        # Let long headings wrap cleanly inside the band.
        p=Paragraph(html.escape(self.title),ParagraphStyle('chapter',fontName='Course-Bold',fontSize=17.5,leading=21,textColor=INK))
        _,ph=p.wrap(self.width-38,50);p.drawOn(c,18,14)


class CoverPage(Flowable):
    def wrap(self, width,height):self.width=width;self.height=height;return width,height
    def draw(self):
        c=self.canv;w=self.width;h=self.height
        c.setFillColor(INK);c.rect(0,0,w,h,fill=1,stroke=0)
        c.setFillColor(colors.HexColor('#153D3E'));c.circle(w*.84,h*.77,175,fill=1,stroke=0)
        c.setFillColor(colors.HexColor('#1B5350'));c.circle(w*.84,h*.77,126,fill=1,stroke=0)
        c.setStrokeColor(colors.HexColor('#4D8C7B'));c.setLineWidth(1)
        for radius in (80,104,128):c.circle(w*.84,h*.77,radius,fill=0,stroke=1)
        c.setFillColor(LIME);c.roundRect(19*mm,h-31*mm,39*mm,7*mm,3*mm,fill=1,stroke=0)
        c.setFillColor(INK);c.setFont('Course-MonoBold',7);c.drawCentredString(38.5*mm,h-28.6*mm,'CURSO PRÁCTICO')
        c.setFillColor(PAPER);c.setFont('Course-Bold',33);c.drawString(19*mm,h-70*mm,'DEL CHAT')
        c.drawString(19*mm,h-85*mm,'AL AGENTE')
        c.setFillColor(LIME);c.setFont('Course-Bold',14);c.drawString(20*mm,h-101*mm,'Qué es un harness y cómo se usa')
        c.setFillColor(colors.HexColor('#C4D6D2'));c.setFont('Course',10.4)
        c.drawString(20*mm,h-113*mm,'Guía visual para ingenieros industriales que ya usan')
        c.drawString(20*mm,h-120*mm,'chats o bots de IA.')
        # Model / harness / tools schematic.
        y=h-172*mm; x=19*mm; boxw=36*mm; boxh=20*mm; gap=9*mm
        cards=[('MODELO','razona',colors.HexColor('#28374C')),('HARNESS','coordina',colors.HexColor('#087E73')),('HERRAMIENTAS','actúan',colors.HexColor('#8C6730'))]
        for i,(head,sub,fill) in enumerate(cards):
            bx=x+i*(boxw+gap);c.setFillColor(fill);c.roundRect(bx,y,boxw,boxh,4*mm,fill=1,stroke=0)
            c.setFillColor(PAPER);c.setFont('Course-Bold',7.5);c.drawCentredString(bx+boxw/2,y+12*mm,head)
            c.setFillColor(colors.HexColor('#DBE7E3'));c.setFont('Course',7);c.drawCentredString(bx+boxw/2,y+6*mm,sub)
            if i<2:
                c.setStrokeColor(LIME);c.setLineWidth(1.4);x1=bx+boxw+2;x2=x1+gap-5;c.line(x1,y+boxh/2,x2,y+boxh/2)
                c.line(x2-4,y+boxh/2+3,x2,y+boxh/2);c.line(x2-4,y+boxh/2-3,x2,y+boxh/2)
        c.setFillColor(colors.HexColor('#A8C1BB'));c.setFont('Course',8.8)
        c.drawString(20*mm,46*mm,'Conceptos · práctica · permisos · verificación')
        c.setStrokeColor(colors.HexColor('#45645F'));c.line(20*mm,38*mm,w-20*mm,38*mm)
        c.setFillColor(colors.HexColor('#C4D6D2'));c.setFont('Course-Mono',7.3)
        c.drawString(20*mm,29*mm,'MATERIAL DEL CURSO  /  GUÍA VISUAL')
        c.setFillColor(LIME);c.drawRightString(w-20*mm,29*mm,'150 MIN · 5 PRÁCTICAS')


class CourseDocTemplate(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(filename,pagesize=A4,leftMargin=19*mm,rightMargin=19*mm,topMargin=18*mm,bottomMargin=18*mm,
                         title='Del chat al agente - Curso practico',author='Material del curso',subject='Harnesses y agentes de IA')
        cover=Frame(0,0,PAGE_W,PAGE_H,id='cover',leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)
        content=Frame(self.leftMargin,self.bottomMargin,self.width,self.height,id='content',leftPadding=0,rightPadding=0,topPadding=0,bottomPadding=0)
        self.addPageTemplates([
            PageTemplate(id='cover',frames=[cover]),
            PageTemplate(id='content',frames=[content],onPage=self.page_chrome),
        ])
        self._bookmark_seq=0; self.chapter_no=''
    def beforeDocument(self):
        self._bookmark_seq=0
    def page_chrome(self,c,doc):
        c.saveState()
        c.setStrokeColor(LINE);c.setLineWidth(.55);c.line(self.leftMargin,PAGE_H-12*mm,PAGE_W-self.rightMargin,PAGE_H-12*mm)
        c.setFont('Course-Mono',6.8);c.setFillColor(MUTED);c.drawString(self.leftMargin,PAGE_H-9.3*mm,'DEL CHAT AL AGENTE')
        c.drawRightString(PAGE_W-self.rightMargin,PAGE_H-9.3*mm,'INGENIERÍA INDUSTRIAL · CUADERNO DE CURSO')
        c.line(self.leftMargin,12*mm,PAGE_W-self.rightMargin,12*mm)
        c.setFont('Course',7.2);c.drawString(self.leftMargin,8*mm,'Conceptos claros. Acciones acotadas. Resultados verificados.')
        c.setFont('Course-MonoBold',7.5);c.setFillColor(TEAL_DARK);c.drawRightString(PAGE_W-self.rightMargin,8*mm,f'{doc.page:02d}')
        c.restoreState()
    def afterFlowable(self,flowable):
        if isinstance(flowable,ChapterBand):
            self._bookmark_seq+=1; key=f'chapter-{self._bookmark_seq}'
            self.canv.bookmarkPage(key);self.canv.addOutlineEntry(flowable.title,key,0,False)
            self.notify('TOCEntry',(0,flowable.title,self.page,key))
        elif isinstance(flowable,Paragraph) and flowable.style.name=='SectionHeading':
            text=flowable.getPlainText(); self._bookmark_seq+=1;key=f'section-{self._bookmark_seq}'
            self.canv.bookmarkPage(key);self.canv.addOutlineEntry(text,key,1,True)
            self.notify('TOCEntry',(1,text,self.page,key))


def parse_document(path: Path, width: float):
    text=path.read_text(encoding='utf-8-sig').replace('\r','')
    lines=text.split('\n');story=[];i=0;first_h1=True;seen={}
    while i<len(lines):
        line=lines[i]
        if not line.strip():i+=1;continue
        fence=re.match(r'^\s*```',line)
        if fence:
            i+=1;code=[]
            while i<len(lines) and not re.match(r'^\s*```',lines[i]):code.append(lines[i]);i+=1
            if i<len(lines):i+=1
            code_text=' '.join(code).upper()
            if 'PIENSA' in code_text and ('ACTUA' in code_text or 'ACTÚA' in code_text) and 'OBSERVA' in code_text:
                story.append(Paragraph('Ciclo del agente, representado en el diagrama anterior.',styles['Small']))
            else:
                story.extend([CodeBlock(code),Spacer(1,5)])
            continue
        heading=re.match(r'^(#{1,6})\s+(.+?)\s*#*\s*$',line)
        if heading:
            level=len(heading.group(1));title=norm(heading.group(2));i+=1
            if level==1 and first_h1:first_h1=False;continue
            style={2:'SectionHeading',3:'SubHeading',4:'MinorHeading'}.get(level,'MinorHeading')
            story.append(Paragraph(inline_markup(title),styles[style]));
            if level==2:
                low=title.lower()
                if 'pieza' in low or 'anatomía' in low:story.append(Diagram('architecture'))
                elif 'bucle' in low:story.append(Diagram('loop'))
                elif 'permiso' in low or 'sandbox' in low:story.append(Diagram('permissions'))
                elif 'pedir bien' in low or 'encargo' in low:story.append(Diagram('prompt'))
                elif 'cinco prácticas' in low or 'cinco practicas' in low or 'mapa de la sesión' in low:story.append(Diagram('route'))
            continue
        if re.match(r'^\s{0,3}(?:[-*_]\s*){3,}$',line):story.append(Rule());i+=1;continue
        if re.match(r'^\s{0,3}>',line):
            quote=[]
            while i<len(lines) and re.match(r'^\s{0,3}>',lines[i]):quote.append(re.sub(r'^\s{0,3}> ?', '',lines[i]));i+=1
            story.append(Callout(' '.join(q.strip() for q in quote if q.strip())));story.append(Spacer(1,7));continue
        if i+1<len(lines) and '|' in line and is_table_sep(lines[i+1]):
            rows=[table_cells(line)];i+=2
            while i<len(lines) and lines[i].strip() and '|' in lines[i]:rows.append(table_cells(lines[i]));i+=1
            story.append(make_table(rows,width));continue
        if re.match(r'^\s*(?:[-+*]|\d+[.)])\s+',line):
            group=[]
            while i<len(lines) and (re.match(r'^\s*(?:[-+*]|\d+[.)])\s+',lines[i]) or (lines[i].startswith(('  ','\t')) and lines[i].strip())):
                group.append(lines[i]);i+=1
            story.extend(list_items(group,width));continue
        paragraph=[line.strip()];i+=1
        while i<len(lines) and lines[i].strip() and not re.match(r'^(?:#{1,6}\s|\s*```|\s{0,3}>|\s*(?:[-+*]|\d+[.)])\s+)',lines[i]) and not re.match(r'^\s{0,3}(?:[-*_]\s*){3,}$',lines[i]) and not (i+1<len(lines) and '|' in lines[i] and is_table_sep(lines[i+1])):
            paragraph.append(lines[i].strip());i+=1
        story.append(Paragraph(inline_markup(' '.join(paragraph)),styles['Body']))
    return story


def build():
    OUT.parent.mkdir(parents=True,exist_ok=True)
    doc=CourseDocTemplate(str(OUT))
    toc=TableOfContents();toc.levelStyles=[styles['ChapterTOC'],styles['SectionTOC']];toc.dotsMinLevel=0
    story=[CoverPage(),NextPageTemplate('content'),PageBreak(),Paragraph('CONTENIDOS',ParagraphStyle('toc-title',fontName='Course-Bold',fontSize=26,leading=32,textColor=INK,spaceAfter=8)),Paragraph('Una ruta de conceptos, prácticas y material de consulta.',styles['Small']),toc,PageBreak()]
    for idx,(number,title,label,filename) in enumerate(DOCS,1):
        path=ROOT/filename
        if not path.exists():raise FileNotFoundError(path)
        if idx>1:story.append(PageBreak())
        story.append(ChapterBand(number,title,label));story.append(Spacer(1,12))
        story.extend(parse_document(path,doc.width))
    doc.multiBuild(story,maxPasses=8)
    print(f'PDF creado: {OUT} ({OUT.stat().st_size:,} bytes)')


if __name__=='__main__':build()
