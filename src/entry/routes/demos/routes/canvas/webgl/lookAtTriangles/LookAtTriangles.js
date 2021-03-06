import React from 'react'
import ReactDOM from 'react-dom'

import {initShaders} from 'WeBGLUtils'

import Matrix4 from 'Matrix4'

const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    uniform mat4 u_ViewMatrix;
    varying vec4 v_Color;
    void main(){
        gl_Position = u_ViewMatrix * a_Position;
        v_Color = a_Color;
    }
`

const FSHADER_SOURCE = `
    precision mediump float;
    varying vec4 v_Color;
    void main(){
        gl_FragColor = v_Color;
    }
`

class LookAtTriangles extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        try {
            const canvas = ReactDOM.findDOMNode(this.refs['canvas'])
            canvas.width = 800
            canvas.height = 600

            const gl = canvas.getContext('webgl')
            if (!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)) {
                throw 'Faild to init Shaders'
            }

            const n = this.initVertexBuffer(gl)

            const u_ViewMatrix = gl.getUniformLocation(gl.program,'u_ViewMatrix')
            if (!u_ViewMatrix) {
                throw 'can not find storage location of u_ViewMatrix'
            }

            const viewMatrix = new Matrix4()
            viewMatrix.setView(0.20,0.25,0.25, 0,0,0, 0,1,0)

            gl.uniformMatrix4fv(u_ViewMatrix,false,viewMatrix.matrix)

            gl.clearColor(0.0,0.0,0.0,1.0)

            gl.clear(gl.COLOR_BUFFER_BIT)

            gl.drawArrays(gl.TRIANGLES,0,n)

        } catch (e) {
            console.log(e)
        }
    }
    initVertexBuffer(gl){
        //顶点坐标和颜色
        const vertexs = new Float32Array([
            0.0,0.5,-0.4, 0.4,1.0,0.4,
            -0.5,-0.5,-0.4, 0.4,1.0,0.4,
            0.5,-0.5,-0.4, 1.0,0.4,0.4,

            0.5,0.4,-0.2, 1.0,0.4,0.4,
            -0.5,0.5,-0.2, 1.0,1.0,0.4,
            0.0,0.6,-0.2, 1.0,1.0,0.4,

            0.0,0.5,0.0, 0.4,0.4,1.0,
            -0.5,-0.5,0.0, 0.4,0.4,1.0,
            0.5,-0.5,0.0, 1.0,0.4,0.4
        ])
        const FSIZE = vertexs.BYTES_PER_ELEMENT

        const vertexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer)
        gl.bufferData(gl.ARRAY_BUFFER,vertexs,gl.STATIC_DRAW)

        //a_Position
        const a_Position = gl.getAttribLocation(gl.program,'a_Position')
        if (a_Position < 0) {
            throw 'can not find storage location of a_Position'
        }
        gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,FSIZE*6,0)
        gl.enableVertexAttribArray(a_Position)

        //a_Color
        const a_Color = gl.getAttribLocation(gl.program,'a_Color')
        if (a_Position < 0) {
            throw 'can not find storage location of a_Color'
        }
        gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE*6,FSIZE*3)
        gl.enableVertexAttribArray(a_Color)
        return 9
    }
    render() {
        return (
            <figure>
                <figcaption>{'看三角形'}</figcaption>
                <canvas ref="canvas">
                    {'your current brower don\'t support canvas,please change another one'}
                </canvas>
            </figure>
        )
    }
}
module.exports = LookAtTriangles
