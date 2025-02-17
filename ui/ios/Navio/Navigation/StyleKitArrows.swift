import UIKit

public class StyleKitArrows : NSObject {
    
    //// Drawing Methods
    
    @objc dynamic public class func drawArrow180(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Group 2
        context.saveGState()
        context.translateBy(x: 24.5, y: 26.5)
        context.scaleBy(x: scale, y: scale)
        
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: -2.36, y: 1.3))
        bezierPath.addLine(to: CGPoint(x: 6.51, y: 13.49))
        bezierPath.addLine(to: CGPoint(x: 15.37, y: 1.3))
        bezierPath.addCurve(to: CGPoint(x: 15.51, y: 0.96), controlPoint1: CGPoint(x: 15.45, y: 1.21), controlPoint2: CGPoint(x: 15.51, y: 1.09))
        bezierPath.addCurve(to: CGPoint(x: 15.01, y: 0.46), controlPoint1: CGPoint(x: 15.51, y: 0.69), controlPoint2: CGPoint(x: 15.28, y: 0.46))
        bezierPath.addCurve(to: CGPoint(x: 14.89, y: 0.47), controlPoint1: CGPoint(x: 14.97, y: 0.46), controlPoint2: CGPoint(x: 14.89, y: 0.47))
        bezierPath.addLine(to: CGPoint(x: 9.15, y: 2.44))
        bezierPath.addCurve(to: CGPoint(x: 9.01, y: 2.46), controlPoint1: CGPoint(x: 9.11, y: 2.45), controlPoint2: CGPoint(x: 9.06, y: 2.46))
        bezierPath.addCurve(to: CGPoint(x: 8.51, y: 2), controlPoint1: CGPoint(x: 8.74, y: 2.46), controlPoint2: CGPoint(x: 8.51, y: 2.26))
        bezierPath.addCurve(to: CGPoint(x: 8.51, y: -0.5), controlPoint1: CGPoint(x: 8.51, y: 1.63), controlPoint2: CGPoint(x: 8.51, y: -0.5))
        bezierPath.addLine(to: CGPoint(x: 6.51, y: -0.5))
        bezierPath.addLine(to: CGPoint(x: 4.5, y: -0.5))
        bezierPath.addCurve(to: CGPoint(x: 4.51, y: 2), controlPoint1: CGPoint(x: 4.5, y: -0.5), controlPoint2: CGPoint(x: 4.51, y: 1.63))
        bezierPath.addCurve(to: CGPoint(x: 4.01, y: 2.47), controlPoint1: CGPoint(x: 4.51, y: 2.26), controlPoint2: CGPoint(x: 4.28, y: 2.47))
        bezierPath.addCurve(to: CGPoint(x: 3.86, y: 2.45), controlPoint1: CGPoint(x: 3.96, y: 2.47), controlPoint2: CGPoint(x: 3.91, y: 2.46))
        bezierPath.addLine(to: CGPoint(x: -1.88, y: 0.48))
        bezierPath.addCurve(to: CGPoint(x: -1.99, y: 0.46), controlPoint1: CGPoint(x: -1.88, y: 0.48), controlPoint2: CGPoint(x: -1.95, y: 0.46))
        bezierPath.addCurve(to: CGPoint(x: -2.49, y: 0.96), controlPoint1: CGPoint(x: -2.27, y: 0.46), controlPoint2: CGPoint(x: -2.49, y: 0.69))
        bezierPath.addCurve(to: CGPoint(x: -2.36, y: 1.3), controlPoint1: CGPoint(x: -2.49, y: 1.09), controlPoint2: CGPoint(x: -2.44, y: 1.21))
        bezierPath.close()
        primaryColor.setFill()
        bezierPath.fill()
        
        
        //// Bezier 2 Drawing
        let bezier2Path = UIBezierPath()
        bezier2Path.move(to: CGPoint(x: -6.5, y: 13.5))
        bezier2Path.addLine(to: CGPoint(x: -6.5, y: -6.66))
        bezier2Path.addCurve(to: CGPoint(x: 0, y: -13.5), controlPoint1: CGPoint(x: -6.5, y: -10.41), controlPoint2: CGPoint(x: -3.55, y: -13.5))
        bezier2Path.addCurve(to: CGPoint(x: 6.5, y: -6.65), controlPoint1: CGPoint(x: 3.59, y: -13.5), controlPoint2: CGPoint(x: 6.5, y: -10.22))
        bezier2Path.addLine(to: CGPoint(x: 6.5, y: 2.5))
        primaryColor.setStroke()
        bezier2Path.lineWidth = 4
        bezier2Path.stroke()
        
        
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawArrow45(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Bezier Drawing
        context.saveGState()
        context.translateBy(x: 27.01, y: 25.01)
        context.scaleBy(x: scale, y: scale)
        
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: -10.01, y: 15.01))
        bezierPath.addLine(to: CGPoint(x: -10.01, y: 1))
        bezierPath.addCurve(to: CGPoint(x: -5.05, y: -3.99), controlPoint1: CGPoint(x: -10.01, y: 0.49), controlPoint2: CGPoint(x: -9.84, y: -3.99))
        bezierPath.addLine(to: CGPoint(x: 2.57, y: -3.99))
        bezierPath.addCurve(to: CGPoint(x: 2.98, y: -3.51), controlPoint1: CGPoint(x: 2.8, y: -3.95), controlPoint2: CGPoint(x: 2.98, y: -3.75))
        bezierPath.addCurve(to: CGPoint(x: 2.96, y: -3.37), controlPoint1: CGPoint(x: 2.98, y: -3.46), controlPoint2: CGPoint(x: 2.97, y: -3.41))
        bezierPath.addLine(to: CGPoint(x: 0.99, y: 2.38))
        bezierPath.addCurve(to: CGPoint(x: 0.98, y: 2.49), controlPoint1: CGPoint(x: 0.99, y: 2.38), controlPoint2: CGPoint(x: 0.98, y: 2.45))
        bezierPath.addCurve(to: CGPoint(x: 1.48, y: 2.99), controlPoint1: CGPoint(x: 0.98, y: 2.77), controlPoint2: CGPoint(x: 1.2, y: 2.99))
        bezierPath.addCurve(to: CGPoint(x: 1.82, y: 2.86), controlPoint1: CGPoint(x: 1.61, y: 2.99), controlPoint2: CGPoint(x: 1.73, y: 2.94))
        bezierPath.addLine(to: CGPoint(x: 14.01, y: -6.01))
        bezierPath.addLine(to: CGPoint(x: 1.82, y: -14.87))
        bezierPath.addCurve(to: CGPoint(x: 1.48, y: -15.01), controlPoint1: CGPoint(x: 1.73, y: -14.95), controlPoint2: CGPoint(x: 1.61, y: -15.01))
        bezierPath.addCurve(to: CGPoint(x: 0.98, y: -14.51), controlPoint1: CGPoint(x: 1.2, y: -15.01), controlPoint2: CGPoint(x: 0.98, y: -14.78))
        bezierPath.addCurve(to: CGPoint(x: 0.99, y: -14.4), controlPoint1: CGPoint(x: 0.98, y: -14.47), controlPoint2: CGPoint(x: 0.99, y: -14.4))
        bezierPath.addLine(to: CGPoint(x: 2.96, y: -8.65))
        bezierPath.addCurve(to: CGPoint(x: 2.98, y: -8.51), controlPoint1: CGPoint(x: 2.97, y: -8.6), controlPoint2: CGPoint(x: 2.98, y: -8.56))
        bezierPath.addCurve(to: CGPoint(x: 2.5, y: -8.01), controlPoint1: CGPoint(x: 2.98, y: -8.24), controlPoint2: CGPoint(x: 2.76, y: -8.01))
        bezierPath.addCurve(to: CGPoint(x: -5.05, y: -7.99), controlPoint1: CGPoint(x: 2.14, y: -8.01), controlPoint2: CGPoint(x: -5.05, y: -7.99))
        bezierPath.addCurve(to: CGPoint(x: -14.01, y: 0.99), controlPoint1: CGPoint(x: -11.58, y: -7.99), controlPoint2: CGPoint(x: -13.99, y: -2.63))
        bezierPath.addLine(to: CGPoint(x: -14.01, y: 15.01))
        primaryColor.setFill()
        bezierPath.fill()
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawArrow30(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Group 3
        context.saveGState()
        context.translateBy(x: 27.78, y: 25.24)
        context.scaleBy(x: scale, y: scale)
        
        //// Bezier 3 Drawing
        let bezier3Path = UIBezierPath()
        bezier3Path.move(to: CGPoint(x: -2.59, y: -5.39))
        bezier3Path.addLine(to: CGPoint(x: -10.13, y: 1.58))
        bezier3Path.addCurve(to: CGPoint(x: -11.92, y: 7.63), controlPoint1: CGPoint(x: -11.29, y: 3.33), controlPoint2: CGPoint(x: -11.92, y: 5.45))
        bezier3Path.addLine(to: CGPoint(x: -11.92, y: 14.76))
        primaryColor.setStroke()
        bezier3Path.lineWidth = 4
        bezier3Path.lineJoinStyle = .round
        bezier3Path.stroke()
        
        //// Bezier 4 Drawing
        let bezier4Path = UIBezierPath()
        bezier4Path.move(to: CGPoint(x: -6.63, y: -12.35))
        bezier4Path.addLine(to: CGPoint(x: 6.22, y: -13.06))
        bezier4Path.addLine(to: CGPoint(x: 3.65, y: -0.45))
        bezier4Path.addCurve(to: CGPoint(x: 3.48, y: -0.12), controlPoint1: CGPoint(x: 3.64, y: -0.33), controlPoint2: CGPoint(x: 3.58, y: -0.21))
        bezier4Path.addCurve(to: CGPoint(x: 2.78, y: -0.17), controlPoint1: CGPoint(x: 3.27, y: 0.06), controlPoint2: CGPoint(x: 2.96, y: 0.04))
        bezier4Path.addCurve(to: CGPoint(x: 2.71, y: -0.27), controlPoint1: CGPoint(x: 2.75, y: -0.2), controlPoint2: CGPoint(x: 2.71, y: -0.27))
        bezier4Path.addLine(to: CGPoint(x: 0.34, y: -4.49))
        bezier4Path.addCurve(to: CGPoint(x: 0.26, y: -4.61), controlPoint1: CGPoint(x: 0.32, y: -4.53), controlPoint2: CGPoint(x: 0.3, y: -4.57))
        bezier4Path.addCurve(to: CGPoint(x: -0.61, y: -4.51), controlPoint1: CGPoint(x: 0.09, y: -4.82), controlPoint2: CGPoint(x: -0.41, y: -4.68))
        bezier4Path.addCurve(to: CGPoint(x: -2.7, y: -2.71), controlPoint1: CGPoint(x: -0.89, y: -4.28), controlPoint2: CGPoint(x: -2.7, y: -2.71))
        bezier4Path.addLine(to: CGPoint(x: -4.01, y: -4.22))
        bezier4Path.addLine(to: CGPoint(x: -5.32, y: -5.74))
        bezier4Path.addCurve(to: CGPoint(x: -3.23, y: -7.54), controlPoint1: CGPoint(x: -5.32, y: -5.74), controlPoint2: CGPoint(x: -3.5, y: -7.3))
        bezier4Path.addCurve(to: CGPoint(x: -3.1, y: -8.31), controlPoint1: CGPoint(x: -3.03, y: -7.71), controlPoint2: CGPoint(x: -2.92, y: -8.11))
        bezier4Path.addCurve(to: CGPoint(x: -3.16, y: -8.45), controlPoint1: CGPoint(x: -3.13, y: -8.35), controlPoint2: CGPoint(x: -3.12, y: -8.42))
        bezier4Path.addLine(to: CGPoint(x: -6.97, y: -11.43))
        bezier4Path.addCurve(to: CGPoint(x: -7.04, y: -11.51), controlPoint1: CGPoint(x: -6.97, y: -11.43), controlPoint2: CGPoint(x: -7.02, y: -11.48))
        bezier4Path.addCurve(to: CGPoint(x: -6.99, y: -12.22), controlPoint1: CGPoint(x: -7.22, y: -11.72), controlPoint2: CGPoint(x: -7.19, y: -12.04))
        bezier4Path.addCurve(to: CGPoint(x: -6.63, y: -12.35), controlPoint1: CGPoint(x: -6.89, y: -12.31), controlPoint2: CGPoint(x: -6.76, y: -12.35))
        bezier4Path.close()
        primaryColor.setFill()
        bezier4Path.fill()
        
        //// Clip Drawing
        context.restoreGState()
    }

    
    @objc dynamic public class func drawArrow0(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Bezier Drawing
        context.saveGState()
        context.translateBy(x: 25, y: 25.02)
        context.scaleBy(x: scale, y: scale)
        
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: 8.86, y: -2.82))
        bezierPath.addLine(to: CGPoint(x: 0, y: -15.02))
        bezierPath.addLine(to: CGPoint(x: -8.86, y: -2.82))
        bezierPath.addCurve(to: CGPoint(x: -9, y: -2.48), controlPoint1: CGPoint(x: -8.95, y: -2.73), controlPoint2: CGPoint(x: -9, y: -2.62))
        bezierPath.addCurve(to: CGPoint(x: -8.5, y: -1.98), controlPoint1: CGPoint(x: -9, y: -2.21), controlPoint2: CGPoint(x: -8.78, y: -1.98))
        bezierPath.addCurve(to: CGPoint(x: -8.39, y: -2), controlPoint1: CGPoint(x: -8.46, y: -1.98), controlPoint2: CGPoint(x: -8.39, y: -2))
        bezierPath.addLine(to: CGPoint(x: -2.64, y: -3.96))
        bezierPath.addCurve(to: CGPoint(x: -2.5, y: -3.98), controlPoint1: CGPoint(x: -2.6, y: -3.98), controlPoint2: CGPoint(x: -2.55, y: -3.98))
        bezierPath.addCurve(to: CGPoint(x: -2, y: -3.5), controlPoint1: CGPoint(x: -2.23, y: -3.98), controlPoint2: CGPoint(x: -2, y: -3.76))
        bezierPath.addLine(to: CGPoint(x: -2, y: 15.02))
        bezierPath.addLine(to: CGPoint(x: 2, y: 15.02))
        bezierPath.addCurve(to: CGPoint(x: 2, y: -3.5), controlPoint1: CGPoint(x: 2, y: 15.02), controlPoint2: CGPoint(x: 2, y: -3.14))
        bezierPath.addCurve(to: CGPoint(x: 2.5, y: -3.98), controlPoint1: CGPoint(x: 2, y: -3.76), controlPoint2: CGPoint(x: 2.23, y: -3.98))
        bezierPath.addCurve(to: CGPoint(x: 2.64, y: -3.96), controlPoint1: CGPoint(x: 2.55, y: -3.98), controlPoint2: CGPoint(x: 2.6, y: -3.98))
        bezierPath.addLine(to: CGPoint(x: 8.39, y: -2))
        bezierPath.addCurve(to: CGPoint(x: 8.5, y: -1.98), controlPoint1: CGPoint(x: 8.39, y: -2), controlPoint2: CGPoint(x: 8.46, y: -1.98))
        bezierPath.addCurve(to: CGPoint(x: 9, y: -2.48), controlPoint1: CGPoint(x: 8.78, y: -1.98), controlPoint2: CGPoint(x: 9, y: -2.21))
        bezierPath.addCurve(to: CGPoint(x: 8.86, y: -2.82), controlPoint1: CGPoint(x: 9, y: -2.62), controlPoint2: CGPoint(x: 8.95, y: -2.73))
        bezierPath.close()
        primaryColor.setFill()
        bezierPath.fill()
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawArrow75(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Group 2
        context.saveGState()
        context.translateBy(x: 27.12, y: 27.5)
        context.scaleBy(x: scale, y: scale)
        
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: -2.66, y: 1.57))
        bezierPath.addLine(to: CGPoint(x: 12.12, y: 4.5))
        bezierPath.addLine(to: CGPoint(x: 10.35, y: -10.47))
        bezierPath.addCurve(to: CGPoint(x: 10.22, y: -10.81), controlPoint1: CGPoint(x: 10.35, y: -10.59), controlPoint2: CGPoint(x: 10.31, y: -10.71))
        bezierPath.addCurve(to: CGPoint(x: 9.52, y: -10.84), controlPoint1: CGPoint(x: 10.04, y: -11.01), controlPoint2: CGPoint(x: 9.72, y: -11.03))
        bezierPath.addCurve(to: CGPoint(x: 9.44, y: -10.75), controlPoint1: CGPoint(x: 9.49, y: -10.81), controlPoint2: CGPoint(x: 9.44, y: -10.75))
        bezierPath.addLine(to: CGPoint(x: 6.56, y: -5.41))
        bezierPath.addCurve(to: CGPoint(x: 6.47, y: -5.3), controlPoint1: CGPoint(x: 6.54, y: -5.37), controlPoint2: CGPoint(x: 6.51, y: -5.33))
        bezierPath.addCurve(to: CGPoint(x: 5.78, y: -5.31), controlPoint1: CGPoint(x: 6.27, y: -5.11), controlPoint2: CGPoint(x: 5.96, y: -5.12))
        bezierPath.addCurve(to: CGPoint(x: 4.08, y: -7.15), controlPoint1: CGPoint(x: 5.53, y: -5.57), controlPoint2: CGPoint(x: 4.08, y: -7.15))
        bezierPath.addLine(to: CGPoint(x: 2.61, y: -5.79))
        bezierPath.addLine(to: CGPoint(x: 1.14, y: -4.43))
        bezierPath.addCurve(to: CGPoint(x: 2.84, y: -2.59), controlPoint1: CGPoint(x: 1.14, y: -4.43), controlPoint2: CGPoint(x: 2.6, y: -2.86))
        bezierPath.addCurve(to: CGPoint(x: 2.8, y: -1.9), controlPoint1: CGPoint(x: 3.02, y: -2.4), controlPoint2: CGPoint(x: 3, y: -2.08))
        bezierPath.addCurve(to: CGPoint(x: 2.68, y: -1.82), controlPoint1: CGPoint(x: 2.77, y: -1.86), controlPoint2: CGPoint(x: 2.72, y: -1.84))
        bezierPath.addLine(to: CGPoint(x: -2.87, y: 0.64))
        bezierPath.addCurve(to: CGPoint(x: -2.96, y: 0.7), controlPoint1: CGPoint(x: -2.87, y: 0.64), controlPoint2: CGPoint(x: -2.94, y: 0.68))
        bezierPath.addCurve(to: CGPoint(x: -2.99, y: 1.41), controlPoint1: CGPoint(x: -3.17, y: 0.89), controlPoint2: CGPoint(x: -3.18, y: 1.21))
        bezierPath.addCurve(to: CGPoint(x: -2.66, y: 1.57), controlPoint1: CGPoint(x: -2.9, y: 1.51), controlPoint2: CGPoint(x: -2.78, y: 1.56))
        bezierPath.close()
        primaryColor.setFill()
        bezierPath.fill()
        
        
        //// Bezier 3 Drawing
        let bezier3Path = UIBezierPath()
        bezier3Path.move(to: CGPoint(x: -12.12, y: -7))
        bezier3Path.addCurve(to: CGPoint(x: -7.62, y: -11.5), controlPoint1: CGPoint(x: -12.12, y: -7), controlPoint2: CGPoint(x: -12.33, y: -11.5))
        bezier3Path.addCurve(to: CGPoint(x: 0.88, y: -7.5), controlPoint1: CGPoint(x: -2.92, y: -11.5), controlPoint2: CGPoint(x: 0.88, y: -7.5))
        bezier3Path.addLine(to: CGPoint(x: 3.88, y: -4.5))
        bezier3Path.move(to: CGPoint(x: -12.12, y: -7.5))
        bezier3Path.addLine(to: CGPoint(x: -12.12, y: -1.5))
        bezier3Path.move(to: CGPoint(x: -12.12, y: -1.5))
        bezier3Path.addLine(to: CGPoint(x: -12.12, y: 0.5))
        bezier3Path.move(to: CGPoint(x: -12.12, y: 0.5))
        bezier3Path.addLine(to: CGPoint(x: -12.12, y: 11.5))
        primaryColor.setStroke()
        bezier3Path.lineWidth = 4
        bezier3Path.stroke()
        
        
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawArriveright(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), secondaryColor: UIColor = UIColor(red: 0.618, green: 0.618, blue: 0.618, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Group 3
        context.saveGState()
        context.translateBy(x: 25.1, y: 24.17)
        context.scaleBy(x: scale, y: scale)
        
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: -13.05, y: -10.17))
        bezierPath.addLine(to: CGPoint(x: -13.05, y: 14.83))
        secondaryColor.setStroke()
        bezierPath.lineWidth = 4
        bezierPath.lineJoinStyle = .round
        bezierPath.stroke()
        
        
        //// Bezier 2 Drawing
        let bezier2Path = UIBezierPath()
        bezier2Path.move(to: CGPoint(x: -13.05, y: 14.83))
        bezier2Path.addLine(to: CGPoint(x: -13.05, y: 6.8))
        bezier2Path.addCurve(to: CGPoint(x: -7.09, y: -0.17), controlPoint1: CGPoint(x: -13.05, y: 6.8), controlPoint2: CGPoint(x: -14.01, y: -0.17))
        bezier2Path.addLine(to: CGPoint(x: -7.05, y: -0.17))
        primaryColor.setStroke()
        bezier2Path.lineWidth = 4
        bezier2Path.stroke()
        
        
        //// Bezier 3 Drawing
        let bezier3Path = UIBezierPath()
        bezier3Path.move(to: CGPoint(x: -2.99, y: 1.83))
        bezier3Path.addCurve(to: CGPoint(x: -2.23, y: 1.83), controlPoint1: CGPoint(x: -2.99, y: 1.83), controlPoint2: CGPoint(x: -2.59, y: 1.83))
        bezier3Path.addCurve(to: CGPoint(x: -1.62, y: 2.33), controlPoint1: CGPoint(x: -1.97, y: 1.83), controlPoint2: CGPoint(x: -1.62, y: 2.05))
        bezier3Path.addCurve(to: CGPoint(x: -1.58, y: 2.47), controlPoint1: CGPoint(x: -1.62, y: 2.38), controlPoint2: CGPoint(x: -1.57, y: 2.42))
        bezier3Path.addLine(to: CGPoint(x: -2.52, y: 7.21))
        bezier3Path.addCurve(to: CGPoint(x: -2.52, y: 7.33), controlPoint1: CGPoint(x: -2.52, y: 7.21), controlPoint2: CGPoint(x: -2.52, y: 7.29))
        bezier3Path.addCurve(to: CGPoint(x: -2.01, y: 7.83), controlPoint1: CGPoint(x: -2.52, y: 7.6), controlPoint2: CGPoint(x: -2.28, y: 7.83))
        bezier3Path.addCurve(to: CGPoint(x: -1.66, y: 7.69), controlPoint1: CGPoint(x: -1.88, y: 7.83), controlPoint2: CGPoint(x: -1.75, y: 7.77))
        bezier3Path.addLine(to: CGPoint(x: 8.53, y: -0.17))
        bezier3Path.addLine(to: CGPoint(x: -1.66, y: -8.04))
        bezier3Path.addCurve(to: CGPoint(x: -2, y: -8.17), controlPoint1: CGPoint(x: -1.75, y: -8.12), controlPoint2: CGPoint(x: -1.87, y: -8.17))
        bezier3Path.addCurve(to: CGPoint(x: -2.5, y: -7.67), controlPoint1: CGPoint(x: -2.28, y: -8.17), controlPoint2: CGPoint(x: -2.5, y: -7.95))
        bezier3Path.addCurve(to: CGPoint(x: -2.49, y: -7.56), controlPoint1: CGPoint(x: -2.5, y: -7.64), controlPoint2: CGPoint(x: -2.49, y: -7.56))
        bezier3Path.addLine(to: CGPoint(x: -1.52, y: -2.82))
        bezier3Path.addCurve(to: CGPoint(x: -1.5, y: -2.67), controlPoint1: CGPoint(x: -1.51, y: -2.77), controlPoint2: CGPoint(x: -1.5, y: -2.72))
        bezier3Path.addCurve(to: CGPoint(x: -2.23, y: -2.17), controlPoint1: CGPoint(x: -1.5, y: -2.4), controlPoint2: CGPoint(x: -1.97, y: -2.17))
        bezier3Path.addCurve(to: CGPoint(x: -2.99, y: -2.18), controlPoint1: CGPoint(x: -2.59, y: -2.17), controlPoint2: CGPoint(x: -2.99, y: -2.18))
        primaryColor.setFill()
        bezier3Path.fill()
        
        
        //// Oval Drawing
        let ovalPath = UIBezierPath(ovalIn: CGRect(x: 9.85, y: -3.37, width: 6.1, height: 6.1))
        primaryColor.setFill()
        ovalPath.fill()
        
        
        //// Rectangle Drawing
        let rectanglePath = UIBezierPath(rect: CGRect(x: -5.97, y: -2.17, width: 1.95, height: 4))
        primaryColor.setFill()
        rectanglePath.fill()
        
        
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawArrive(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Group 2
        context.saveGState()
        context.translateBy(x: 25, y: 24.57)
        context.scaleBy(x: scale, y: scale)
        
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: 0.06, y: 6.6))
        bezierPath.addLine(to: CGPoint(x: 0.06, y: 16.6))
        primaryColor.setStroke()
        bezierPath.lineWidth = 4
        bezierPath.lineJoinStyle = .round
        bezierPath.stroke()
        
        
        //// Bezier 2 Drawing
        let bezier2Path = UIBezierPath()
        bezier2Path.move(to: CGPoint(x: -2, y: 2.48))
        bezier2Path.addCurve(to: CGPoint(x: -2, y: 1.73), controlPoint1: CGPoint(x: -2, y: 2.48), controlPoint2: CGPoint(x: -2, y: 2.09))
        bezier2Path.addCurve(to: CGPoint(x: -2.5, y: 1.12), controlPoint1: CGPoint(x: -2, y: 1.46), controlPoint2: CGPoint(x: -2.23, y: 1.12))
        bezier2Path.addCurve(to: CGPoint(x: -2.64, y: 1.08), controlPoint1: CGPoint(x: -2.55, y: 1.12), controlPoint2: CGPoint(x: -2.6, y: 1.07))
        bezier2Path.addLine(to: CGPoint(x: -7.39, y: 2.02))
        bezier2Path.addCurve(to: CGPoint(x: -7.5, y: 2.01), controlPoint1: CGPoint(x: -7.39, y: 2.02), controlPoint2: CGPoint(x: -7.46, y: 2.01))
        bezier2Path.addCurve(to: CGPoint(x: -8, y: 1.51), controlPoint1: CGPoint(x: -7.78, y: 2.01), controlPoint2: CGPoint(x: -8, y: 1.78))
        bezier2Path.addCurve(to: CGPoint(x: -7.86, y: 1.16), controlPoint1: CGPoint(x: -8, y: 1.37), controlPoint2: CGPoint(x: -7.95, y: 1.25))
        bezier2Path.addLine(to: CGPoint(x: 0, y: -9.03))
        bezier2Path.addLine(to: CGPoint(x: 7.86, y: 1.16))
        bezier2Path.addCurve(to: CGPoint(x: 8, y: 1.5), controlPoint1: CGPoint(x: 7.95, y: 1.25), controlPoint2: CGPoint(x: 8, y: 1.37))
        bezier2Path.addCurve(to: CGPoint(x: 7.5, y: 2), controlPoint1: CGPoint(x: 8, y: 1.77), controlPoint2: CGPoint(x: 7.78, y: 2))
        bezier2Path.addCurve(to: CGPoint(x: 7.39, y: 1.99), controlPoint1: CGPoint(x: 7.46, y: 2), controlPoint2: CGPoint(x: 7.39, y: 1.99))
        bezier2Path.addLine(to: CGPoint(x: 2.64, y: 1.02))
        bezier2Path.addCurve(to: CGPoint(x: 2.5, y: 1), controlPoint1: CGPoint(x: 2.6, y: 1.01), controlPoint2: CGPoint(x: 2.55, y: 1))
        bezier2Path.addCurve(to: CGPoint(x: 2, y: 1.73), controlPoint1: CGPoint(x: 2.23, y: 1), controlPoint2: CGPoint(x: 2, y: 1.46))
        bezier2Path.addCurve(to: CGPoint(x: 2, y: 2.48), controlPoint1: CGPoint(x: 2, y: 2.09), controlPoint2: CGPoint(x: 2, y: 2.48))
        primaryColor.setFill()
        bezier2Path.fill()
        
        
        //// Oval Drawing
        let ovalPath = UIBezierPath(ovalIn: CGRect(x: -3, y: -16.6, width: 6.1, height: 6.1))
        primaryColor.setFill()
        ovalPath.fill()
        
        
        //// Rectangle Drawing
        let rectanglePath = UIBezierPath(rect: CGRect(x: -2, y: 3.62, width: 4, height: 1.95))
        primaryColor.setFill()
        rectanglePath.fill()
        
        
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawStarting(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Bezier 2 Drawing
        context.saveGState()
        context.translateBy(x: 25, y: 24.5)
        context.scaleBy(x: scale, y: scale)
        
        let bezier2Path = UIBezierPath()
        bezier2Path.move(to: CGPoint(x: 0, y: -10.5))
        bezier2Path.addLine(to: CGPoint(x: -10, y: 10.5))
        bezier2Path.addLine(to: CGPoint(x: 0.07, y: 4.2))
        bezier2Path.addLine(to: CGPoint(x: 10, y: 10.5))
        bezier2Path.addLine(to: CGPoint(x: 0, y: -10.5))
        bezier2Path.close()
        bezier2Path.usesEvenOddFillRule = true
        primaryColor.setFill()
        bezier2Path.fill()
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawDestination(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Bezier Drawing
        context.saveGState()
        context.translateBy(x: 25.16, y: 20.86)
        context.scaleBy(x: scale, y: scale)
        
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: -0.16, y: 16.14))
        bezierPath.addCurve(to: CGPoint(x: 2.84, y: 10.14), controlPoint1: CGPoint(x: -0.1, y: 16.14), controlPoint2: CGPoint(x: 1.39, y: 13.07))
        bezierPath.addCurve(to: CGPoint(x: 7.84, y: -0.53), controlPoint1: CGPoint(x: 4.3, y: 7.2), controlPoint2: CGPoint(x: 7.84, y: 4.14))
        bezierPath.addCurve(to: CGPoint(x: -0.1, y: -7.86), controlPoint1: CGPoint(x: 7.84, y: -4.05), controlPoint2: CGPoint(x: 4.35, y: -7.86))
        bezierPath.addCurve(to: CGPoint(x: -8.16, y: -0.53), controlPoint1: CGPoint(x: -4.56, y: -7.86), controlPoint2: CGPoint(x: -8.16, y: -4.05))
        bezierPath.addCurve(to: CGPoint(x: -3.16, y: 10.14), controlPoint1: CGPoint(x: -8.16, y: 4.14), controlPoint2: CGPoint(x: -4.61, y: 7.2))
        bezierPath.addCurve(to: CGPoint(x: -0.16, y: 16.14), controlPoint1: CGPoint(x: -1.7, y: 13.07), controlPoint2: CGPoint(x: -0.22, y: 16.14))
        bezierPath.close()
        bezierPath.move(to: CGPoint(x: -0.15, y: -2))
        bezierPath.addCurve(to: CGPoint(x: 2.02, y: 0.11), controlPoint1: CGPoint(x: 0.98, y: -2), controlPoint2: CGPoint(x: 2.02, y: -1))
        bezierPath.addCurve(to: CGPoint(x: -0.17, y: 2.4), controlPoint1: CGPoint(x: 2.02, y: 1.23), controlPoint2: CGPoint(x: 0.98, y: 2.4))
        bezierPath.addCurve(to: CGPoint(x: -2.34, y: 0.1), controlPoint1: CGPoint(x: -1.3, y: 2.4), controlPoint2: CGPoint(x: -2.34, y: 1.22))
        bezierPath.addCurve(to: CGPoint(x: -0.15, y: -2), controlPoint1: CGPoint(x: -2.34, y: -1.01), controlPoint2: CGPoint(x: -1.29, y: -2))
        bezierPath.close()
        bezierPath.usesEvenOddFillRule = true
        primaryColor.setFill()
        bezierPath.fill()
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawMerge(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), secondaryColor: UIColor = UIColor(red: 0.618, green: 0.618, blue: 0.618, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Group 3
        context.saveGState()
        context.translateBy(x: 25.07, y: 24.48)
        context.scaleBy(x: scale, y: scale)
        
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: -8.07, y: 16.48))
        bezierPath.addLine(to: CGPoint(x: -8.07, y: 12.47))
        bezierPath.addCurve(to: CGPoint(x: -6.28, y: 7.09), controlPoint1: CGPoint(x: -8.07, y: 10.53), controlPoint2: CGPoint(x: -7.44, y: 8.64))
        bezierPath.addLine(to: CGPoint(x: -1.86, y: 1.19))
        bezierPath.addCurve(to: CGPoint(x: -0.07, y: -4.19), controlPoint1: CGPoint(x: -0.69, y: -0.37), controlPoint2: CGPoint(x: -0.07, y: -2.25))
        bezierPath.addLine(to: CGPoint(x: -0.07, y: -10.52))
        secondaryColor.setStroke()
        bezierPath.lineWidth = 4
        bezierPath.lineJoinStyle = .round
        bezierPath.stroke()
        
        
        //// Bezier 2 Drawing
        let bezier2Path = UIBezierPath()
        bezier2Path.move(to: CGPoint(x: 8.06, y: 16.4))
        bezier2Path.addLine(to: CGPoint(x: 8.06, y: 12.39))
        bezier2Path.addCurve(to: CGPoint(x: 6.27, y: 7.01), controlPoint1: CGPoint(x: 8.06, y: 10.45), controlPoint2: CGPoint(x: 7.43, y: 8.56))
        bezier2Path.addLine(to: CGPoint(x: 1.85, y: 1.1))
        bezier2Path.addCurve(to: CGPoint(x: 0.06, y: -4.27), controlPoint1: CGPoint(x: 0.69, y: -0.45), controlPoint2: CGPoint(x: 0.06, y: -2.34))
        bezier2Path.addLine(to: CGPoint(x: 0.06, y: -10.6))
        primaryColor.setStroke()
        bezier2Path.lineWidth = 4
        bezier2Path.lineJoinStyle = .round
        bezier2Path.stroke()
        
        
        //// Bezier 3 Drawing
        let bezier3Path = UIBezierPath()
        bezier3Path.move(to: CGPoint(x: -7.8, y: -6.29))
        bezier3Path.addLine(to: CGPoint(x: 0.07, y: -16.48))
        bezier3Path.addLine(to: CGPoint(x: 7.93, y: -6.29))
        bezier3Path.addCurve(to: CGPoint(x: 8.07, y: -5.95), controlPoint1: CGPoint(x: 8.01, y: -6.2), controlPoint2: CGPoint(x: 8.07, y: -6.08))
        bezier3Path.addCurve(to: CGPoint(x: 7.57, y: -5.45), controlPoint1: CGPoint(x: 8.07, y: -5.68), controlPoint2: CGPoint(x: 7.84, y: -5.45))
        bezier3Path.addCurve(to: CGPoint(x: 7.45, y: -5.47), controlPoint1: CGPoint(x: 7.53, y: -5.45), controlPoint2: CGPoint(x: 7.45, y: -5.47))
        bezier3Path.addLine(to: CGPoint(x: 2.71, y: -6.43))
        bezier3Path.addCurve(to: CGPoint(x: 2.57, y: -6.45), controlPoint1: CGPoint(x: 2.66, y: -6.45), controlPoint2: CGPoint(x: 2.62, y: -6.45))
        bezier3Path.addCurve(to: CGPoint(x: 2.07, y: -5.72), controlPoint1: CGPoint(x: 2.3, y: -6.45), controlPoint2: CGPoint(x: 2.07, y: -5.99))
        bezier3Path.addCurve(to: CGPoint(x: 2.07, y: -2.97), controlPoint1: CGPoint(x: 2.07, y: -5.36), controlPoint2: CGPoint(x: 2.07, y: -2.97))
        bezier3Path.addLine(to: CGPoint(x: 0.07, y: -2.97))
        bezier3Path.addLine(to: CGPoint(x: -1.94, y: -2.97))
        bezier3Path.addCurve(to: CGPoint(x: -1.93, y: -5.72), controlPoint1: CGPoint(x: -1.94, y: -2.97), controlPoint2: CGPoint(x: -1.93, y: -5.36))
        bezier3Path.addCurve(to: CGPoint(x: -2.43, y: -6.33), controlPoint1: CGPoint(x: -1.93, y: -5.99), controlPoint2: CGPoint(x: -2.16, y: -6.33))
        bezier3Path.addCurve(to: CGPoint(x: -2.58, y: -6.37), controlPoint1: CGPoint(x: -2.48, y: -6.33), controlPoint2: CGPoint(x: -2.53, y: -6.38))
        bezier3Path.addLine(to: CGPoint(x: -7.32, y: -5.43))
        bezier3Path.addCurve(to: CGPoint(x: -7.43, y: -5.44), controlPoint1: CGPoint(x: -7.32, y: -5.43), controlPoint2: CGPoint(x: -7.4, y: -5.44))
        bezier3Path.addCurve(to: CGPoint(x: -7.93, y: -5.94), controlPoint1: CGPoint(x: -7.71, y: -5.44), controlPoint2: CGPoint(x: -7.93, y: -5.67))
        bezier3Path.addCurve(to: CGPoint(x: -7.8, y: -6.29), controlPoint1: CGPoint(x: -7.93, y: -6.08), controlPoint2: CGPoint(x: -7.88, y: -6.2))
        bezier3Path.close()
        primaryColor.setFill()
        bezier3Path.fill()
        
        
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawRoundabout(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), secondaryColor: UIColor = UIColor(red: 0.618, green: 0.618, blue: 0.618, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Group 3
        context.saveGState()
        context.translateBy(x: 28.01, y: 22.99)
        context.scaleBy(x: scale, y: scale)
        
        
        
        
        context.restoreGState()
        
        
        //// Group 4
        context.saveGState()
        context.translateBy(x: 20.5, y: 23.5)
        context.scaleBy(x: scale, y: scale)
        
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: 7.5, y: 0))
        bezierPath.addCurve(to: CGPoint(x: 5.31, y: 5.3), controlPoint1: CGPoint(x: 7.5, y: 2.07), controlPoint2: CGPoint(x: 6.66, y: 3.94))
        bezierPath.addCurve(to: CGPoint(x: 0, y: 7.5), controlPoint1: CGPoint(x: 3.95, y: 6.66), controlPoint2: CGPoint(x: 2.07, y: 7.5))
        bezierPath.addCurve(to: CGPoint(x: -5.29, y: 5.32), controlPoint1: CGPoint(x: -2.06, y: 7.5), controlPoint2: CGPoint(x: -3.94, y: 6.67))
        bezierPath.addCurve(to: CGPoint(x: -7.5, y: 0), controlPoint1: CGPoint(x: -6.66, y: 3.96), controlPoint2: CGPoint(x: -7.5, y: 2.08))
        bezierPath.addCurve(to: CGPoint(x: -5.3, y: -5.3), controlPoint1: CGPoint(x: -7.5, y: -2.07), controlPoint2: CGPoint(x: -6.66, y: -3.95))
        bezierPath.addCurve(to: CGPoint(x: 0, y: -7.5), controlPoint1: CGPoint(x: -3.95, y: -6.66), controlPoint2: CGPoint(x: -2.07, y: -7.5))
        bezierPath.addCurve(to: CGPoint(x: 5.3, y: -5.3), controlPoint1: CGPoint(x: 2.07, y: -7.5), controlPoint2: CGPoint(x: 3.95, y: -6.66))
        bezierPath.addCurve(to: CGPoint(x: 7.5, y: 0), controlPoint1: CGPoint(x: 6.66, y: -3.95), controlPoint2: CGPoint(x: 7.5, y: -2.07))
        bezierPath.close()
        secondaryColor.setStroke()
        bezierPath.lineWidth = 4
        bezierPath.lineJoinStyle = .round
        bezierPath.stroke()
        
        
        //// Bezier 3 Drawing
        let bezier3Path = UIBezierPath()
        bezier3Path.move(to: CGPoint(x: 7.5, y: 0))
        bezier3Path.addCurve(to: CGPoint(x: 5.31, y: 5.3), controlPoint1: CGPoint(x: 7.5, y: 2.07), controlPoint2: CGPoint(x: 6.66, y: 3.94))
        bezier3Path.addCurve(to: CGPoint(x: 0, y: 7.5), controlPoint1: CGPoint(x: 3.95, y: 6.66), controlPoint2: CGPoint(x: 2.07, y: 7.5))
        primaryColor.setStroke()
        bezier3Path.lineWidth = 4
        bezier3Path.lineJoinStyle = .round
        bezier3Path.stroke()
        
        
        //// Bezier 4 Drawing
        let bezier4Path = UIBezierPath()
        bezier4Path.move(to: CGPoint(x: 0.53, y: 5.51))
        bezier4Path.addLine(to: CGPoint(x: 0.53, y: 15.51))
        primaryColor.setStroke()
        bezier4Path.lineWidth = 4
        bezier4Path.stroke()
        
        
        //// Bezier 5 Drawing
        let bezier5Path = UIBezierPath()
        bezier5Path.move(to: CGPoint(x: 5.53, y: 0.51))
        bezier5Path.addLine(to: CGPoint(x: 14.53, y: 0.51))
        primaryColor.setStroke()
        bezier5Path.lineWidth = 4
        bezier5Path.stroke()
        
        
        //// Bezier 6 Drawing
        let bezier6Path = UIBezierPath()
        bezier6Path.move(to: CGPoint(x: 12.33, y: 8.37))
        bezier6Path.addLine(to: CGPoint(x: 22.53, y: 0.51))
        bezier6Path.addLine(to: CGPoint(x: 12.33, y: -7.36))
        bezier6Path.addCurve(to: CGPoint(x: 12, y: -7.49), controlPoint1: CGPoint(x: 12.25, y: -7.44), controlPoint2: CGPoint(x: 12.13, y: -7.49))
        bezier6Path.addCurve(to: CGPoint(x: 11.5, y: -6.99), controlPoint1: CGPoint(x: 11.72, y: -7.49), controlPoint2: CGPoint(x: 11.5, y: -7.27))
        bezier6Path.addCurve(to: CGPoint(x: 11.51, y: -6.88), controlPoint1: CGPoint(x: 11.5, y: -6.96), controlPoint2: CGPoint(x: 11.51, y: -6.88))
        bezier6Path.addLine(to: CGPoint(x: 12.47, y: -2.14))
        bezier6Path.addCurve(to: CGPoint(x: 12.5, y: -1.99), controlPoint1: CGPoint(x: 12.49, y: -2.09), controlPoint2: CGPoint(x: 12.5, y: -2.04))
        bezier6Path.addCurve(to: CGPoint(x: 11.77, y: -1.49), controlPoint1: CGPoint(x: 12.5, y: -1.72), controlPoint2: CGPoint(x: 12.03, y: -1.49))
        bezier6Path.addCurve(to: CGPoint(x: 9.01, y: -1.5), controlPoint1: CGPoint(x: 11.41, y: -1.49), controlPoint2: CGPoint(x: 9.01, y: -1.5))
        bezier6Path.addLine(to: CGPoint(x: 9.01, y: 0.51))
        bezier6Path.addLine(to: CGPoint(x: 9.01, y: 2.51))
        bezier6Path.addCurve(to: CGPoint(x: 11.77, y: 2.51), controlPoint1: CGPoint(x: 9.01, y: 2.51), controlPoint2: CGPoint(x: 11.41, y: 2.51))
        bezier6Path.addCurve(to: CGPoint(x: 12.37, y: 3.01), controlPoint1: CGPoint(x: 12.03, y: 2.51), controlPoint2: CGPoint(x: 12.37, y: 2.73))
        bezier6Path.addCurve(to: CGPoint(x: 12.41, y: 3.15), controlPoint1: CGPoint(x: 12.37, y: 3.05), controlPoint2: CGPoint(x: 12.43, y: 3.1))
        bezier6Path.addLine(to: CGPoint(x: 11.48, y: 7.89))
        bezier6Path.addCurve(to: CGPoint(x: 11.48, y: 8.01), controlPoint1: CGPoint(x: 11.48, y: 7.89), controlPoint2: CGPoint(x: 11.48, y: 7.97))
        bezier6Path.addCurve(to: CGPoint(x: 11.99, y: 8.51), controlPoint1: CGPoint(x: 11.48, y: 8.28), controlPoint2: CGPoint(x: 11.71, y: 8.51))
        bezier6Path.addCurve(to: CGPoint(x: 12.33, y: 8.37), controlPoint1: CGPoint(x: 12.12, y: 8.51), controlPoint2: CGPoint(x: 12.25, y: 8.45))
        bezier6Path.close()
        primaryColor.setFill()
        bezier6Path.fill()
        
        
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawFork(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), secondaryColor: UIColor = UIColor(red: 0.618, green: 0.618, blue: 0.618, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Group 3
        context.saveGState()
        context.translateBy(x: 25.57, y: 25.42)
        context.scaleBy(x: scale, y: scale)
        
        context.beginTransparencyLayer(auxiliaryInfo: nil)
        
        //// Clip Clip
        let clipPath = UIBezierPath(rect: CGRect(x: -13.6, y: -13.39, width: 25.15, height: 28.8))
        clipPath.addClip()
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: 1.11, y: 15.32))
        bezierPath.addLine(to: CGPoint(x: 1.11, y: 9))
        bezierPath.addCurve(to: CGPoint(x: 2.9, y: 3.62), controlPoint1: CGPoint(x: 1.11, y: 7.06), controlPoint2: CGPoint(x: 1.74, y: 5.17))
        bezierPath.addLine(to: CGPoint(x: 7.33, y: -2.29))
        bezierPath.addCurve(to: CGPoint(x: 9.58, y: -7.67), controlPoint1: CGPoint(x: 8.49, y: -3.84), controlPoint2: CGPoint(x: 9.58, y: -5.73))
        bezierPath.addLine(to: CGPoint(x: 9.58, y: -12.73))
        secondaryColor.setStroke()
        bezierPath.lineWidth = 4
        bezierPath.lineJoinStyle = .round
        bezierPath.stroke()
        
        
        //// Bezier 2 Drawing
        let bezier2Path = UIBezierPath()
        bezier2Path.move(to: CGPoint(x: -5.22, y: -2.2))
        bezier2Path.addLine(to: CGPoint(x: -0.8, y: 3.7))
        bezier2Path.addCurve(to: CGPoint(x: 0.99, y: 9.08), controlPoint1: CGPoint(x: 0.36, y: 5.25), controlPoint2: CGPoint(x: 0.99, y: 7.14))
        bezier2Path.addLine(to: CGPoint(x: 0.99, y: 15.41))
        primaryColor.setStroke()
        bezier2Path.lineWidth = 4
        bezier2Path.lineJoinStyle = .round
        bezier2Path.stroke()
        
        
        //// Bezier 3 Drawing
        let bezier3Path = UIBezierPath()
        bezier3Path.move(to: CGPoint(x: -0.39, y: -9.17))
        bezier3Path.addLine(to: CGPoint(x: -12.54, y: -13.42))
        bezier3Path.addLine(to: CGPoint(x: -13.56, y: -0.59))
        bezier3Path.addCurve(to: CGPoint(x: -13.49, y: -0.23), controlPoint1: CGPoint(x: -13.59, y: -0.47), controlPoint2: CGPoint(x: -13.57, y: -0.34))
        bezier3Path.addCurve(to: CGPoint(x: -12.8, y: -0.08), controlPoint1: CGPoint(x: -13.34, y: 0), controlPoint2: CGPoint(x: -13.03, y: 0.07))
        bezier3Path.addCurve(to: CGPoint(x: -12.71, y: -0.15), controlPoint1: CGPoint(x: -12.77, y: -0.1), controlPoint2: CGPoint(x: -12.71, y: -0.15))
        bezier3Path.addLine(to: CGPoint(x: -9.27, y: -3.55))
        bezier3Path.addCurve(to: CGPoint(x: -9.16, y: -3.65), controlPoint1: CGPoint(x: -9.24, y: -3.59), controlPoint2: CGPoint(x: -9.2, y: -3.62))
        bezier3Path.addCurve(to: CGPoint(x: -8.34, y: -3.31), controlPoint1: CGPoint(x: -8.93, y: -3.8), controlPoint2: CGPoint(x: -8.48, y: -3.53))
        bezier3Path.addCurve(to: CGPoint(x: -6.84, y: -1), controlPoint1: CGPoint(x: -8.14, y: -3.01), controlPoint2: CGPoint(x: -6.84, y: -1))
        bezier3Path.addLine(to: CGPoint(x: -5.16, y: -2.09))
        bezier3Path.addLine(to: CGPoint(x: -3.48, y: -3.19))
        bezier3Path.addCurve(to: CGPoint(x: -4.99, y: -5.49), controlPoint1: CGPoint(x: -3.48, y: -3.19), controlPoint2: CGPoint(x: -4.79, y: -5.19))
        bezier3Path.addCurve(to: CGPoint(x: -4.9, y: -6.28), controlPoint1: CGPoint(x: -5.13, y: -5.71), controlPoint2: CGPoint(x: -5.13, y: -6.13))
        bezier3Path.addCurve(to: CGPoint(x: -4.8, y: -6.39), controlPoint1: CGPoint(x: -4.86, y: -6.3), controlPoint2: CGPoint(x: -4.85, y: -6.37))
        bezier3Path.addLine(to: CGPoint(x: -0.32, y: -8.19))
        bezier3Path.addCurve(to: CGPoint(x: -0.22, y: -8.26), controlPoint1: CGPoint(x: -0.32, y: -8.19), controlPoint2: CGPoint(x: -0.26, y: -8.23))
        bezier3Path.addCurve(to: CGPoint(x: -0.08, y: -8.95), controlPoint1: CGPoint(x: 0.01, y: -8.41), controlPoint2: CGPoint(x: 0.07, y: -8.72))
        bezier3Path.addCurve(to: CGPoint(x: -0.39, y: -9.17), controlPoint1: CGPoint(x: -0.15, y: -9.06), controlPoint2: CGPoint(x: -0.27, y: -9.14))
        bezier3Path.close()
        primaryColor.setFill()
        bezier3Path.fill()
        
        
        context.endTransparencyLayer()
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawOfframp(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), secondaryColor: UIColor = UIColor(red: 0.618, green: 0.618, blue: 0.618, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Group 3
        context.saveGState()
        context.translateBy(x: 25.38, y: 27.24)
        context.scaleBy(x: scale, y: scale)
        
        context.beginTransparencyLayer(auxiliaryInfo: nil)
        
        //// Clip Clip
        let clipPath = UIBezierPath(rect: CGRect(x: -13.38, y: -14.23, width: 20.4, height: 26.75))
        clipPath.addClip()
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: 4.88, y: 12.42))
        bezierPath.addLine(to: CGPoint(x: 4.88, y: 6.51))
        bezierPath.addCurve(to: CGPoint(x: 5.01, y: -14.22), controlPoint1: CGPoint(x: 4.88, y: 4.71), controlPoint2: CGPoint(x: 5.01, y: -14.22))
        secondaryColor.setStroke()
        bezierPath.lineWidth = 4
        bezierPath.lineJoinStyle = .round
        bezierPath.stroke()
        
        
        //// Bezier 2 Drawing
        let bezier2Path = UIBezierPath()
        bezier2Path.move(to: CGPoint(x: -4.57, y: -5.39))
        bezier2Path.addLine(to: CGPoint(x: 2.97, y: 0.8))
        bezier2Path.addCurve(to: CGPoint(x: 4.76, y: 6.17), controlPoint1: CGPoint(x: 4.13, y: 2.35), controlPoint2: CGPoint(x: 4.76, y: 4.23))
        bezier2Path.addLine(to: CGPoint(x: 4.76, y: 12.5))
        primaryColor.setStroke()
        bezier2Path.lineWidth = 4
        bezier2Path.lineJoinStyle = .round
        bezier2Path.stroke()
        
        
        //// Bezier 3 Drawing
        let bezier3Path = UIBezierPath()
        bezier3Path.move(to: CGPoint(x: -0.53, y: -12.35))
        bezier3Path.addLine(to: CGPoint(x: -13.38, y: -13.06))
        bezier3Path.addLine(to: CGPoint(x: -10.81, y: -0.45))
        bezier3Path.addCurve(to: CGPoint(x: -10.65, y: -0.12), controlPoint1: CGPoint(x: -10.8, y: -0.33), controlPoint2: CGPoint(x: -10.74, y: -0.21))
        bezier3Path.addCurve(to: CGPoint(x: -9.94, y: -0.17), controlPoint1: CGPoint(x: -10.44, y: 0.06), controlPoint2: CGPoint(x: -10.12, y: 0.04))
        bezier3Path.addCurve(to: CGPoint(x: -9.88, y: -0.27), controlPoint1: CGPoint(x: -9.91, y: -0.2), controlPoint2: CGPoint(x: -9.88, y: -0.27))
        bezier3Path.addLine(to: CGPoint(x: -7.5, y: -4.49))
        bezier3Path.addCurve(to: CGPoint(x: -7.43, y: -4.61), controlPoint1: CGPoint(x: -7.49, y: -4.53), controlPoint2: CGPoint(x: -7.46, y: -4.57))
        bezier3Path.addCurve(to: CGPoint(x: -6.55, y: -4.51), controlPoint1: CGPoint(x: -7.25, y: -4.82), controlPoint2: CGPoint(x: -6.75, y: -4.68))
        bezier3Path.addCurve(to: CGPoint(x: -4.47, y: -2.71), controlPoint1: CGPoint(x: -6.28, y: -4.28), controlPoint2: CGPoint(x: -4.47, y: -2.71))
        bezier3Path.addLine(to: CGPoint(x: -3.16, y: -4.22))
        bezier3Path.addLine(to: CGPoint(x: -1.85, y: -5.74))
        bezier3Path.addCurve(to: CGPoint(x: -3.93, y: -7.54), controlPoint1: CGPoint(x: -1.85, y: -5.74), controlPoint2: CGPoint(x: -3.66, y: -7.3))
        bezier3Path.addCurve(to: CGPoint(x: -4.07, y: -8.31), controlPoint1: CGPoint(x: -4.13, y: -7.71), controlPoint2: CGPoint(x: -4.24, y: -8.11))
        bezier3Path.addCurve(to: CGPoint(x: -4, y: -8.45), controlPoint1: CGPoint(x: -4.03, y: -8.35), controlPoint2: CGPoint(x: -4.04, y: -8.42))
        bezier3Path.addLine(to: CGPoint(x: -0.19, y: -11.43))
        bezier3Path.addCurve(to: CGPoint(x: -0.12, y: -11.51), controlPoint1: CGPoint(x: -0.19, y: -11.43), controlPoint2: CGPoint(x: -0.14, y: -11.48))
        bezier3Path.addCurve(to: CGPoint(x: -0.18, y: -12.22), controlPoint1: CGPoint(x: 0.06, y: -11.72), controlPoint2: CGPoint(x: 0.03, y: -12.04))
        bezier3Path.addCurve(to: CGPoint(x: -0.53, y: -12.35), controlPoint1: CGPoint(x: -0.28, y: -12.31), controlPoint2: CGPoint(x: -0.41, y: -12.35))
        bezier3Path.close()
        primaryColor.setFill()
        bezier3Path.fill()
        
        
        context.endTransparencyLayer()
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawRoundabout_180(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), secondaryColor: UIColor = UIColor(red: 0.618, green: 0.618, blue: 0.618, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Group 2
        context.saveGState()
        context.translateBy(x: 25, y: 24.37)
        context.scaleBy(x: scale, y: scale)
        
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: 7, y: 3.86))
        bezierPath.addCurve(to: CGPoint(x: 4.81, y: 9.16), controlPoint1: CGPoint(x: 7, y: 5.93), controlPoint2: CGPoint(x: 6.16, y: 7.8))
        bezierPath.addCurve(to: CGPoint(x: -0.5, y: 11.36), controlPoint1: CGPoint(x: 3.45, y: 10.52), controlPoint2: CGPoint(x: 1.57, y: 11.36))
        bezierPath.addCurve(to: CGPoint(x: -5.79, y: 9.18), controlPoint1: CGPoint(x: -2.57, y: 11.36), controlPoint2: CGPoint(x: -4.44, y: 10.53))
        bezierPath.addCurve(to: CGPoint(x: -8, y: 3.86), controlPoint1: CGPoint(x: -7.16, y: 7.82), controlPoint2: CGPoint(x: -8, y: 5.94))
        bezierPath.addCurve(to: CGPoint(x: -5.81, y: -1.44), controlPoint1: CGPoint(x: -8, y: 1.79), controlPoint2: CGPoint(x: -7.16, y: -0.08))
        bezierPath.addCurve(to: CGPoint(x: -0.5, y: -3.64), controlPoint1: CGPoint(x: -4.45, y: -2.8), controlPoint2: CGPoint(x: -2.57, y: -3.64))
        bezierPath.addCurve(to: CGPoint(x: 4.8, y: -1.44), controlPoint1: CGPoint(x: 1.57, y: -3.64), controlPoint2: CGPoint(x: 3.44, y: -2.8))
        bezierPath.addCurve(to: CGPoint(x: 7, y: 3.86), controlPoint1: CGPoint(x: 6.16, y: -0.08), controlPoint2: CGPoint(x: 7, y: 1.79))
        bezierPath.close()
        secondaryColor.setStroke()
        bezierPath.lineWidth = 4
        bezierPath.lineJoinStyle = .round
        bezierPath.stroke()
        
        
        //// Bezier 2 Drawing
        let bezier2Path = UIBezierPath()
        bezier2Path.move(to: CGPoint(x: 0.02, y: 9.37))
        bezier2Path.addLine(to: CGPoint(x: 0.02, y: 19.37))
        primaryColor.setStroke()
        bezier2Path.lineWidth = 4
        bezier2Path.stroke()
        
        
        //// Bezier 3 Drawing
        let bezier3Path = UIBezierPath()
        bezier3Path.move(to: CGPoint(x: -0.51, y: -3.64))
        bezier3Path.addCurve(to: CGPoint(x: 4.79, y: -1.44), controlPoint1: CGPoint(x: 1.56, y: -3.64), controlPoint2: CGPoint(x: 3.44, y: -2.8))
        bezier3Path.addCurve(to: CGPoint(x: 6.99, y: 3.86), controlPoint1: CGPoint(x: 6.15, y: -0.08), controlPoint2: CGPoint(x: 6.99, y: 1.79))
        bezier3Path.addCurve(to: CGPoint(x: 4.8, y: 9.16), controlPoint1: CGPoint(x: 6.99, y: 5.93), controlPoint2: CGPoint(x: 6.15, y: 7.8))
        bezier3Path.addCurve(to: CGPoint(x: -0.51, y: 11.36), controlPoint1: CGPoint(x: 3.44, y: 10.52), controlPoint2: CGPoint(x: 1.56, y: 11.36))
        primaryColor.setStroke()
        bezier3Path.lineWidth = 4
        bezier3Path.lineJoinStyle = .round
        bezier3Path.stroke()
        
        
        //// Bezier 4 Drawing
        let bezier4Path = UIBezierPath()
        bezier4Path.move(to: CGPoint(x: 2.02, y: -8.63))
        bezier4Path.addCurve(to: CGPoint(x: 2.5, y: -9.34), controlPoint1: CGPoint(x: 2.03, y: -8.9), controlPoint2: CGPoint(x: 2.24, y: -9.34))
        bezier4Path.addCurve(to: CGPoint(x: 2.65, y: -9.32), controlPoint1: CGPoint(x: 2.55, y: -9.34), controlPoint2: CGPoint(x: 2.6, y: -9.33))
        bezier4Path.addLine(to: CGPoint(x: 7.39, y: -8.35))
        bezier4Path.addCurve(to: CGPoint(x: 7.5, y: -8.34), controlPoint1: CGPoint(x: 7.39, y: -8.35), controlPoint2: CGPoint(x: 7.46, y: -8.34))
        bezier4Path.addCurve(to: CGPoint(x: 8, y: -8.84), controlPoint1: CGPoint(x: 7.78, y: -8.34), controlPoint2: CGPoint(x: 8, y: -8.56))
        bezier4Path.addCurve(to: CGPoint(x: 7.87, y: -9.18), controlPoint1: CGPoint(x: 8, y: -8.97), controlPoint2: CGPoint(x: 7.95, y: -9.09))
        bezier4Path.addLine(to: CGPoint(x: 0, y: -19.37))
        bezier4Path.addLine(to: CGPoint(x: -7.86, y: -9.18))
        bezier4Path.addCurve(to: CGPoint(x: -8, y: -8.83), controlPoint1: CGPoint(x: -7.94, y: -9.09), controlPoint2: CGPoint(x: -8, y: -8.96))
        bezier4Path.addCurve(to: CGPoint(x: -7.5, y: -8.32), controlPoint1: CGPoint(x: -8, y: -8.55), controlPoint2: CGPoint(x: -7.77, y: -8.32))
        bezier4Path.addCurve(to: CGPoint(x: -7.38, y: -8.32), controlPoint1: CGPoint(x: -7.46, y: -8.32), controlPoint2: CGPoint(x: -7.38, y: -8.32))
        bezier4Path.addLine(to: CGPoint(x: -2.64, y: -9.26))
        bezier4Path.addCurve(to: CGPoint(x: -2.44, y: -9.23), controlPoint1: CGPoint(x: -2.55, y: -9.25), controlPoint2: CGPoint(x: -2.48, y: -9.25))
        bezier4Path.addCurve(to: CGPoint(x: -1.98, y: -8.63), controlPoint1: CGPoint(x: -2.18, y: -9.14), controlPoint2: CGPoint(x: -1.98, y: -8.89))
        bezier4Path.addLine(to: CGPoint(x: -1.98, y: -1.63))
        bezier4Path.addLine(to: CGPoint(x: 2.02, y: -1.63))
        primaryColor.setFill()
        bezier4Path.fill()
        
        
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawRoundabout_45(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), secondaryColor: UIColor = UIColor(red: 0.618, green: 0.618, blue: 0.618, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Group 3
        context.saveGState()
        context.translateBy(x: 22.5, y: 22.5)
        context.scaleBy(x: scale, y: scale)
        
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: 5.45, y: 14.43))
        bezierPath.addLine(to: CGPoint(x: 18.33, y: 14.42))
        bezierPath.addLine(to: CGPoint(x: 15.06, y: 1.97))
        bezierPath.addCurve(to: CGPoint(x: 14.88, y: 1.66), controlPoint1: CGPoint(x: 15.04, y: 1.85), controlPoint2: CGPoint(x: 14.98, y: 1.74))
        bezierPath.addCurve(to: CGPoint(x: 14.17, y: 1.75), controlPoint1: CGPoint(x: 14.66, y: 1.49), controlPoint2: CGPoint(x: 14.34, y: 1.53))
        bezierPath.addCurve(to: CGPoint(x: 14.12, y: 1.85), controlPoint1: CGPoint(x: 14.15, y: 1.78), controlPoint2: CGPoint(x: 14.12, y: 1.85))
        bezierPath.addLine(to: CGPoint(x: 11.98, y: 6.19))
        bezierPath.addCurve(to: CGPoint(x: 11.91, y: 6.32), controlPoint1: CGPoint(x: 11.97, y: 6.24), controlPoint2: CGPoint(x: 11.94, y: 6.28))
        bezierPath.addCurve(to: CGPoint(x: 11.03, y: 6.27), controlPoint1: CGPoint(x: 11.75, y: 6.53), controlPoint2: CGPoint(x: 11.24, y: 6.43))
        bezierPath.addCurve(to: CGPoint(x: 8.85, y: 4.58), controlPoint1: CGPoint(x: 10.74, y: 6.05), controlPoint2: CGPoint(x: 8.85, y: 4.58))
        bezierPath.addLine(to: CGPoint(x: 7.63, y: 6.17))
        bezierPath.addLine(to: CGPoint(x: 6.4, y: 7.76))
        bezierPath.addCurve(to: CGPoint(x: 8.59, y: 9.44), controlPoint1: CGPoint(x: 6.4, y: 7.76), controlPoint2: CGPoint(x: 8.3, y: 9.22))
        bezierPath.addCurve(to: CGPoint(x: 8.76, y: 10.2), controlPoint1: CGPoint(x: 8.79, y: 9.6), controlPoint2: CGPoint(x: 8.93, y: 9.99))
        bezierPath.addCurve(to: CGPoint(x: 8.71, y: 10.34), controlPoint1: CGPoint(x: 8.73, y: 10.24), controlPoint2: CGPoint(x: 8.74, y: 10.31))
        bezierPath.addLine(to: CGPoint(x: 5.07, y: 13.53))
        bezierPath.addCurve(to: CGPoint(x: 5, y: 13.62), controlPoint1: CGPoint(x: 5.07, y: 13.53), controlPoint2: CGPoint(x: 5.02, y: 13.59))
        bezierPath.addCurve(to: CGPoint(x: 5.1, y: 14.32), controlPoint1: CGPoint(x: 4.83, y: 13.83), controlPoint2: CGPoint(x: 4.88, y: 14.15))
        bezierPath.addCurve(to: CGPoint(x: 5.45, y: 14.43), controlPoint1: CGPoint(x: 5.2, y: 14.4), controlPoint2: CGPoint(x: 5.33, y: 14.44))
        bezierPath.close()
        primaryColor.setFill()
        bezierPath.fill()
        
        
        //// Bezier 2 Drawing
        let bezier2Path = UIBezierPath()
        bezier2Path.move(to: CGPoint(x: 7.5, y: 0))
        bezier2Path.addCurve(to: CGPoint(x: 5.31, y: 5.3), controlPoint1: CGPoint(x: 7.5, y: 2.07), controlPoint2: CGPoint(x: 6.66, y: 3.94))
        bezier2Path.addCurve(to: CGPoint(x: 0, y: 7.5), controlPoint1: CGPoint(x: 3.95, y: 6.66), controlPoint2: CGPoint(x: 2.07, y: 7.5))
        bezier2Path.addCurve(to: CGPoint(x: -5.29, y: 5.32), controlPoint1: CGPoint(x: -2.06, y: 7.5), controlPoint2: CGPoint(x: -3.94, y: 6.67))
        bezier2Path.addCurve(to: CGPoint(x: -7.5, y: 0), controlPoint1: CGPoint(x: -6.66, y: 3.96), controlPoint2: CGPoint(x: -7.5, y: 2.08))
        bezier2Path.addCurve(to: CGPoint(x: -5.3, y: -5.3), controlPoint1: CGPoint(x: -7.5, y: -2.07), controlPoint2: CGPoint(x: -6.66, y: -3.95))
        bezier2Path.addCurve(to: CGPoint(x: 0, y: -7.5), controlPoint1: CGPoint(x: -3.95, y: -6.66), controlPoint2: CGPoint(x: -2.07, y: -7.5))
        bezier2Path.addCurve(to: CGPoint(x: 5.3, y: -5.3), controlPoint1: CGPoint(x: 2.07, y: -7.5), controlPoint2: CGPoint(x: 3.95, y: -6.66))
        bezier2Path.addCurve(to: CGPoint(x: 7.5, y: 0), controlPoint1: CGPoint(x: 6.66, y: -3.95), controlPoint2: CGPoint(x: 7.5, y: -2.07))
        bezier2Path.close()
        secondaryColor.setStroke()
        bezier2Path.lineWidth = 4
        bezier2Path.lineJoinStyle = .round
        bezier2Path.stroke()
        
        
        //// Bezier 3 Drawing
        let bezier3Path = UIBezierPath()
        bezier3Path.move(to: CGPoint(x: -0.47, y: 5.51))
        bezier3Path.addLine(to: CGPoint(x: -0.47, y: 16.51))
        primaryColor.setStroke()
        bezier3Path.lineWidth = 4
        bezier3Path.stroke()
        
        
        //// Bezier 4 Drawing
        let bezier4Path = UIBezierPath()
        bezier4Path.move(to: CGPoint(x: 4.07, y: 3.63))
        bezier4Path.addLine(to: CGPoint(x: 11.9, y: 9.26))
        primaryColor.setStroke()
        bezier4Path.lineWidth = 4
        bezier4Path.stroke()
        
        
        //// Bezier 5 Drawing
        let bezier5Path = UIBezierPath()
        bezier5Path.move(to: CGPoint(x: 5.31, y: 5.3))
        bezier5Path.addCurve(to: CGPoint(x: -0, y: 7.5), controlPoint1: CGPoint(x: 3.95, y: 6.66), controlPoint2: CGPoint(x: 2.08, y: 7.5))
        primaryColor.setStroke()
        bezier5Path.lineWidth = 4
        bezier5Path.lineJoinStyle = .round
        bezier5Path.stroke()
        
        
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawRoundabout_315(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), secondaryColor: UIColor = UIColor(red: 0.618, green: 0.618, blue: 0.618, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Group 3
        context.saveGState()
        context.translateBy(x: 23.43, y: 22.05)
        context.scaleBy(x: scale, y: scale)
        
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: -0.56, y: 12.87))
        bezierPath.addLine(to: CGPoint(x: -13.43, y: 12.87))
        bezierPath.addLine(to: CGPoint(x: -10.16, y: 0.42))
        bezierPath.addCurve(to: CGPoint(x: -9.98, y: 0.1), controlPoint1: CGPoint(x: -10.14, y: 0.3), controlPoint2: CGPoint(x: -10.08, y: 0.18))
        bezierPath.addCurve(to: CGPoint(x: -9.28, y: 0.19), controlPoint1: CGPoint(x: -9.76, y: -0.06), controlPoint2: CGPoint(x: -9.44, y: -0.02))
        bezierPath.addCurve(to: CGPoint(x: -9.22, y: 0.29), controlPoint1: CGPoint(x: -9.25, y: 0.22), controlPoint2: CGPoint(x: -9.22, y: 0.29))
        bezierPath.addLine(to: CGPoint(x: -7.08, y: 4.64))
        bezierPath.addCurve(to: CGPoint(x: -7.01, y: 4.76), controlPoint1: CGPoint(x: -7.07, y: 4.68), controlPoint2: CGPoint(x: -7.04, y: 4.73))
        bezierPath.addCurve(to: CGPoint(x: -6.13, y: 4.72), controlPoint1: CGPoint(x: -6.85, y: 4.98), controlPoint2: CGPoint(x: -6.34, y: 4.88))
        bezierPath.addCurve(to: CGPoint(x: -3.95, y: 3.03), controlPoint1: CGPoint(x: -5.85, y: 4.49), controlPoint2: CGPoint(x: -3.95, y: 3.03))
        bezierPath.addLine(to: CGPoint(x: -2.73, y: 4.62))
        bezierPath.addLine(to: CGPoint(x: -1.5, y: 6.2))
        bezierPath.addCurve(to: CGPoint(x: -3.69, y: 7.88), controlPoint1: CGPoint(x: -1.5, y: 6.2), controlPoint2: CGPoint(x: -3.4, y: 7.66))
        bezierPath.addCurve(to: CGPoint(x: -3.86, y: 8.65), controlPoint1: CGPoint(x: -3.9, y: 8.04), controlPoint2: CGPoint(x: -4.03, y: 8.43))
        bezierPath.addCurve(to: CGPoint(x: -3.81, y: 8.79), controlPoint1: CGPoint(x: -3.83, y: 8.69), controlPoint2: CGPoint(x: -3.85, y: 8.76))
        bezierPath.addLine(to: CGPoint(x: -0.17, y: 11.97))
        bezierPath.addCurve(to: CGPoint(x: -0.1, y: 12.06), controlPoint1: CGPoint(x: -0.17, y: 11.97), controlPoint2: CGPoint(x: -0.13, y: 12.03))
        bezierPath.addCurve(to: CGPoint(x: -0.2, y: 12.77), controlPoint1: CGPoint(x: 0.07, y: 12.28), controlPoint2: CGPoint(x: 0.02, y: 12.6))
        bezierPath.addCurve(to: CGPoint(x: -0.56, y: 12.87), controlPoint1: CGPoint(x: -0.3, y: 12.85), controlPoint2: CGPoint(x: -0.43, y: 12.88))
        bezierPath.close()
        primaryColor.setFill()
        bezierPath.fill()
        
        
        //// Bezier 2 Drawing
        let bezier2Path = UIBezierPath()
        bezier2Path.move(to: CGPoint(x: 13, y: -0.55))
        bezier2Path.addCurve(to: CGPoint(x: 10.82, y: 4.74), controlPoint1: CGPoint(x: 13, y: 1.51), controlPoint2: CGPoint(x: 12.17, y: 3.38))
        bezier2Path.addCurve(to: CGPoint(x: 5.5, y: 6.95), controlPoint1: CGPoint(x: 9.46, y: 6.1), controlPoint2: CGPoint(x: 7.58, y: 6.95))
        bezier2Path.addCurve(to: CGPoint(x: 0.21, y: 4.76), controlPoint1: CGPoint(x: 3.44, y: 6.95), controlPoint2: CGPoint(x: 1.57, y: 6.11))
        bezier2Path.addCurve(to: CGPoint(x: -2, y: -0.55), controlPoint1: CGPoint(x: -1.15, y: 3.4), controlPoint2: CGPoint(x: -2, y: 1.52))
        bezier2Path.addCurve(to: CGPoint(x: 0.2, y: -5.86), controlPoint1: CGPoint(x: -2, y: -2.62), controlPoint2: CGPoint(x: -1.16, y: -4.5))
        bezier2Path.addCurve(to: CGPoint(x: 5.5, y: -8.05), controlPoint1: CGPoint(x: 1.56, y: -7.21), controlPoint2: CGPoint(x: 3.43, y: -8.05))
        bezier2Path.addCurve(to: CGPoint(x: 10.81, y: -5.86), controlPoint1: CGPoint(x: 7.57, y: -8.05), controlPoint2: CGPoint(x: 9.45, y: -7.21))
        bezier2Path.addCurve(to: CGPoint(x: 13, y: -0.55), controlPoint1: CGPoint(x: 12.16, y: -4.5), controlPoint2: CGPoint(x: 13, y: -2.62))
        bezier2Path.close()
        secondaryColor.setStroke()
        bezier2Path.lineWidth = 4
        bezier2Path.lineJoinStyle = .round
        bezier2Path.stroke()
        
        
        //// Bezier 3 Drawing
        let bezier3Path = UIBezierPath()
        bezier3Path.move(to: CGPoint(x: 5.03, y: 4.95))
        bezier3Path.addLine(to: CGPoint(x: 5.03, y: 15.95))
        primaryColor.setStroke()
        bezier3Path.lineWidth = 4
        bezier3Path.stroke()
        
        
        //// Bezier 4 Drawing
        let bezier4Path = UIBezierPath()
        bezier4Path.move(to: CGPoint(x: 0.83, y: 2.08))
        bezier4Path.addLine(to: CGPoint(x: -7, y: 7.7))
        primaryColor.setStroke()
        bezier4Path.lineWidth = 4
        bezier4Path.stroke()
        
        
        //// Bezier 5 Drawing
        let bezier5Path = UIBezierPath()
        bezier5Path.move(to: CGPoint(x: 0.21, y: 4.76))
        bezier5Path.addCurve(to: CGPoint(x: -2, y: -0.55), controlPoint1: CGPoint(x: -1.15, y: 3.4), controlPoint2: CGPoint(x: -2, y: 1.52))
        bezier5Path.addCurve(to: CGPoint(x: 0.2, y: -5.86), controlPoint1: CGPoint(x: -2, y: -2.62), controlPoint2: CGPoint(x: -1.16, y: -4.5))
        bezier5Path.addCurve(to: CGPoint(x: 5.5, y: -8.05), controlPoint1: CGPoint(x: 1.56, y: -7.21), controlPoint2: CGPoint(x: 3.43, y: -8.05))
        bezier5Path.addCurve(to: CGPoint(x: 10.81, y: -5.86), controlPoint1: CGPoint(x: 7.57, y: -8.05), controlPoint2: CGPoint(x: 9.45, y: -7.21))
        bezier5Path.addCurve(to: CGPoint(x: 13, y: -0.55), controlPoint1: CGPoint(x: 12.16, y: -4.5), controlPoint2: CGPoint(x: 13, y: -2.62))
        bezier5Path.addCurve(to: CGPoint(x: 10.81, y: 4.74), controlPoint1: CGPoint(x: 13, y: 1.51), controlPoint2: CGPoint(x: 12.17, y: 3.39))
        bezier5Path.addCurve(to: CGPoint(x: 5.5, y: 6.95), controlPoint1: CGPoint(x: 9.46, y: 6.1), controlPoint2: CGPoint(x: 7.58, y: 6.95))
        primaryColor.setStroke()
        bezier5Path.lineWidth = 4
        bezier5Path.lineJoinStyle = .round
        bezier5Path.stroke()
        
        
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawRoundabout_275(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), secondaryColor: UIColor = UIColor(red: 0.618, green: 0.618, blue: 0.618, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Group 3
        context.saveGState()
        context.translateBy(x: 24, y: 24)
        context.scaleBy(x: scale, y: scale)
        
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: 12.97, y: -0.5))
        bezierPath.addCurve(to: CGPoint(x: 10.79, y: 4.79), controlPoint1: CGPoint(x: 12.97, y: 1.56), controlPoint2: CGPoint(x: 12.14, y: 3.43))
        bezierPath.addCurve(to: CGPoint(x: 5.47, y: 7), controlPoint1: CGPoint(x: 9.43, y: 6.15), controlPoint2: CGPoint(x: 7.55, y: 7))
        bezierPath.addCurve(to: CGPoint(x: 0.18, y: 4.81), controlPoint1: CGPoint(x: 3.41, y: 7), controlPoint2: CGPoint(x: 1.54, y: 6.16))
        bezierPath.addCurve(to: CGPoint(x: -2.03, y: -0.5), controlPoint1: CGPoint(x: -1.18, y: 3.45), controlPoint2: CGPoint(x: -2.03, y: 1.57))
        bezierPath.addCurve(to: CGPoint(x: 0.17, y: -5.81), controlPoint1: CGPoint(x: -2.03, y: -2.58), controlPoint2: CGPoint(x: -1.19, y: -4.45))
        bezierPath.addCurve(to: CGPoint(x: 5.47, y: -8), controlPoint1: CGPoint(x: 1.53, y: -7.17), controlPoint2: CGPoint(x: 3.4, y: -8))
        bezierPath.addCurve(to: CGPoint(x: 10.78, y: -5.81), controlPoint1: CGPoint(x: 7.55, y: -8), controlPoint2: CGPoint(x: 9.42, y: -7.17))
        bezierPath.addCurve(to: CGPoint(x: 12.97, y: -0.5), controlPoint1: CGPoint(x: 12.14, y: -4.45), controlPoint2: CGPoint(x: 12.97, y: -2.58))
        bezierPath.close()
        secondaryColor.setStroke()
        bezierPath.lineWidth = 4
        bezierPath.lineJoinStyle = .round
        bezierPath.stroke()
        
        
        //// Bezier 3 Drawing
        let bezier3Path = UIBezierPath()
        bezier3Path.move(to: CGPoint(x: 6, y: 5))
        bezier3Path.addLine(to: CGPoint(x: 6, y: 15))
        primaryColor.setStroke()
        bezier3Path.lineWidth = 4
        bezier3Path.stroke()
        
        
        //// Bezier 4 Drawing
        let bezier4Path = UIBezierPath()
        bezier4Path.move(to: CGPoint(x: -2.03, y: -0.5))
        bezier4Path.addCurve(to: CGPoint(x: 0.17, y: -5.81), controlPoint1: CGPoint(x: -2.03, y: -2.58), controlPoint2: CGPoint(x: -1.19, y: -4.45))
        bezier4Path.addCurve(to: CGPoint(x: 5.47, y: -8), controlPoint1: CGPoint(x: 1.53, y: -7.17), controlPoint2: CGPoint(x: 3.4, y: -8))
        bezier4Path.addCurve(to: CGPoint(x: 10.78, y: -5.81), controlPoint1: CGPoint(x: 7.55, y: -8), controlPoint2: CGPoint(x: 9.42, y: -7.17))
        bezier4Path.addCurve(to: CGPoint(x: 12.97, y: -0.5), controlPoint1: CGPoint(x: 12.13, y: -4.45), controlPoint2: CGPoint(x: 12.97, y: -2.58))
        bezier4Path.addCurve(to: CGPoint(x: 10.79, y: 4.79), controlPoint1: CGPoint(x: 12.97, y: 1.56), controlPoint2: CGPoint(x: 12.14, y: 3.43))
        bezier4Path.addCurve(to: CGPoint(x: 5.47, y: 7), controlPoint1: CGPoint(x: 9.43, y: 6.15), controlPoint2: CGPoint(x: 7.55, y: 7))
        primaryColor.setStroke()
        bezier4Path.lineWidth = 4
        bezier4Path.lineJoinStyle = .round
        bezier4Path.stroke()
        
        
        //// Bezier 5 Drawing
        let bezier5Path = UIBezierPath()
        bezier5Path.move(to: CGPoint(x: 0, y: 0))
        bezier5Path.addLine(to: CGPoint(x: -9, y: 0))
        primaryColor.setStroke()
        bezier5Path.lineWidth = 4
        bezier5Path.stroke()
        
        
        //// Bezier 6 Drawing
        let bezier6Path = UIBezierPath()
        bezier6Path.move(to: CGPoint(x: -6.81, y: 7.86))
        bezier6Path.addLine(to: CGPoint(x: -17, y: 0))
        bezier6Path.addLine(to: CGPoint(x: -6.81, y: -7.86))
        bezier6Path.addCurve(to: CGPoint(x: -6.47, y: -8), controlPoint1: CGPoint(x: -6.72, y: -7.95), controlPoint2: CGPoint(x: -6.6, y: -8))
        bezier6Path.addCurve(to: CGPoint(x: -5.97, y: -7.5), controlPoint1: CGPoint(x: -6.19, y: -8), controlPoint2: CGPoint(x: -5.97, y: -7.77))
        bezier6Path.addCurve(to: CGPoint(x: -5.98, y: -7.39), controlPoint1: CGPoint(x: -5.97, y: -7.46), controlPoint2: CGPoint(x: -5.98, y: -7.39))
        bezier6Path.addLine(to: CGPoint(x: -6.95, y: -2.64))
        bezier6Path.addCurve(to: CGPoint(x: -6.97, y: -2.5), controlPoint1: CGPoint(x: -6.96, y: -2.6), controlPoint2: CGPoint(x: -6.97, y: -2.55))
        bezier6Path.addCurve(to: CGPoint(x: -6.24, y: -2), controlPoint1: CGPoint(x: -6.97, y: -2.23), controlPoint2: CGPoint(x: -6.5, y: -2))
        bezier6Path.addCurve(to: CGPoint(x: -3.48, y: -2), controlPoint1: CGPoint(x: -5.88, y: -2), controlPoint2: CGPoint(x: -3.48, y: -2))
        bezier6Path.addLine(to: CGPoint(x: -3.48, y: 0))
        bezier6Path.addLine(to: CGPoint(x: -3.48, y: 2.01))
        bezier6Path.addCurve(to: CGPoint(x: -6.24, y: 2), controlPoint1: CGPoint(x: -3.48, y: 2.01), controlPoint2: CGPoint(x: -5.88, y: 2))
        bezier6Path.addCurve(to: CGPoint(x: -6.85, y: 2.5), controlPoint1: CGPoint(x: -6.5, y: 2), controlPoint2: CGPoint(x: -6.85, y: 2.23))
        bezier6Path.addCurve(to: CGPoint(x: -6.89, y: 2.64), controlPoint1: CGPoint(x: -6.85, y: 2.55), controlPoint2: CGPoint(x: -6.9, y: 2.6))
        bezier6Path.addLine(to: CGPoint(x: -5.95, y: 7.39))
        bezier6Path.addCurve(to: CGPoint(x: -5.95, y: 7.5), controlPoint1: CGPoint(x: -5.95, y: 7.39), controlPoint2: CGPoint(x: -5.95, y: 7.46))
        bezier6Path.addCurve(to: CGPoint(x: -6.46, y: 8), controlPoint1: CGPoint(x: -5.95, y: 7.78), controlPoint2: CGPoint(x: -6.19, y: 8))
        bezier6Path.addCurve(to: CGPoint(x: -6.81, y: 7.86), controlPoint1: CGPoint(x: -6.59, y: 8), controlPoint2: CGPoint(x: -6.72, y: 7.95))
        bezier6Path.close()
        primaryColor.setFill()
        bezier6Path.fill()
        
        
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawRoundabout_90(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), secondaryColor: UIColor = UIColor(red: 0.618, green: 0.618, blue: 0.618, alpha: 1.000), scale: CGFloat = 1) {
        //// General Declarations
        let context = UIGraphicsGetCurrentContext()!
        
        //// Group 3
        context.saveGState()
        context.translateBy(x: 28.01, y: 22.99)
        context.scaleBy(x: scale, y: scale)
        
        
        
        
        context.restoreGState()
        
        
        //// Group 4
        context.saveGState()
        context.translateBy(x: 20.5, y: 23.5)
        context.scaleBy(x: scale, y: scale)
        
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: 7.5, y: 0))
        bezierPath.addCurve(to: CGPoint(x: 5.31, y: 5.3), controlPoint1: CGPoint(x: 7.5, y: 2.07), controlPoint2: CGPoint(x: 6.66, y: 3.94))
        bezierPath.addCurve(to: CGPoint(x: 0, y: 7.5), controlPoint1: CGPoint(x: 3.95, y: 6.66), controlPoint2: CGPoint(x: 2.07, y: 7.5))
        bezierPath.addCurve(to: CGPoint(x: -5.29, y: 5.32), controlPoint1: CGPoint(x: -2.06, y: 7.5), controlPoint2: CGPoint(x: -3.94, y: 6.67))
        bezierPath.addCurve(to: CGPoint(x: -7.5, y: 0), controlPoint1: CGPoint(x: -6.66, y: 3.96), controlPoint2: CGPoint(x: -7.5, y: 2.08))
        bezierPath.addCurve(to: CGPoint(x: -5.3, y: -5.3), controlPoint1: CGPoint(x: -7.5, y: -2.07), controlPoint2: CGPoint(x: -6.66, y: -3.95))
        bezierPath.addCurve(to: CGPoint(x: 0, y: -7.5), controlPoint1: CGPoint(x: -3.95, y: -6.66), controlPoint2: CGPoint(x: -2.07, y: -7.5))
        bezierPath.addCurve(to: CGPoint(x: 5.3, y: -5.3), controlPoint1: CGPoint(x: 2.07, y: -7.5), controlPoint2: CGPoint(x: 3.95, y: -6.66))
        bezierPath.addCurve(to: CGPoint(x: 7.5, y: 0), controlPoint1: CGPoint(x: 6.66, y: -3.95), controlPoint2: CGPoint(x: 7.5, y: -2.07))
        bezierPath.close()
        secondaryColor.setStroke()
        bezierPath.lineWidth = 4
        bezierPath.lineJoinStyle = .round
        bezierPath.stroke()
        
        
        //// Bezier 3 Drawing
        let bezier3Path = UIBezierPath()
        bezier3Path.move(to: CGPoint(x: 7.5, y: 0))
        bezier3Path.addCurve(to: CGPoint(x: 5.31, y: 5.3), controlPoint1: CGPoint(x: 7.5, y: 2.07), controlPoint2: CGPoint(x: 6.66, y: 3.94))
        bezier3Path.addCurve(to: CGPoint(x: 0, y: 7.5), controlPoint1: CGPoint(x: 3.95, y: 6.66), controlPoint2: CGPoint(x: 2.07, y: 7.5))
        primaryColor.setStroke()
        bezier3Path.lineWidth = 4
        bezier3Path.lineJoinStyle = .round
        bezier3Path.stroke()
        
        
        //// Bezier 4 Drawing
        let bezier4Path = UIBezierPath()
        bezier4Path.move(to: CGPoint(x: 0.53, y: 5.51))
        bezier4Path.addLine(to: CGPoint(x: 0.53, y: 15.51))
        primaryColor.setStroke()
        bezier4Path.lineWidth = 4
        bezier4Path.stroke()
        
        
        //// Bezier 5 Drawing
        let bezier5Path = UIBezierPath()
        bezier5Path.move(to: CGPoint(x: 5.53, y: 0.51))
        bezier5Path.addLine(to: CGPoint(x: 14.53, y: 0.51))
        primaryColor.setStroke()
        bezier5Path.lineWidth = 4
        bezier5Path.stroke()
        
        
        //// Bezier 6 Drawing
        let bezier6Path = UIBezierPath()
        bezier6Path.move(to: CGPoint(x: 12.33, y: 8.37))
        bezier6Path.addLine(to: CGPoint(x: 22.53, y: 0.51))
        bezier6Path.addLine(to: CGPoint(x: 12.33, y: -7.36))
        bezier6Path.addCurve(to: CGPoint(x: 12, y: -7.49), controlPoint1: CGPoint(x: 12.25, y: -7.44), controlPoint2: CGPoint(x: 12.13, y: -7.49))
        bezier6Path.addCurve(to: CGPoint(x: 11.5, y: -6.99), controlPoint1: CGPoint(x: 11.72, y: -7.49), controlPoint2: CGPoint(x: 11.5, y: -7.27))
        bezier6Path.addCurve(to: CGPoint(x: 11.51, y: -6.88), controlPoint1: CGPoint(x: 11.5, y: -6.96), controlPoint2: CGPoint(x: 11.51, y: -6.88))
        bezier6Path.addLine(to: CGPoint(x: 12.47, y: -2.14))
        bezier6Path.addCurve(to: CGPoint(x: 12.5, y: -1.99), controlPoint1: CGPoint(x: 12.49, y: -2.09), controlPoint2: CGPoint(x: 12.5, y: -2.04))
        bezier6Path.addCurve(to: CGPoint(x: 11.77, y: -1.49), controlPoint1: CGPoint(x: 12.5, y: -1.72), controlPoint2: CGPoint(x: 12.03, y: -1.49))
        bezier6Path.addCurve(to: CGPoint(x: 9.01, y: -1.5), controlPoint1: CGPoint(x: 11.41, y: -1.49), controlPoint2: CGPoint(x: 9.01, y: -1.5))
        bezier6Path.addLine(to: CGPoint(x: 9.01, y: 0.51))
        bezier6Path.addLine(to: CGPoint(x: 9.01, y: 2.51))
        bezier6Path.addCurve(to: CGPoint(x: 11.77, y: 2.51), controlPoint1: CGPoint(x: 9.01, y: 2.51), controlPoint2: CGPoint(x: 11.41, y: 2.51))
        bezier6Path.addCurve(to: CGPoint(x: 12.37, y: 3.01), controlPoint1: CGPoint(x: 12.03, y: 2.51), controlPoint2: CGPoint(x: 12.37, y: 2.73))
        bezier6Path.addCurve(to: CGPoint(x: 12.41, y: 3.15), controlPoint1: CGPoint(x: 12.37, y: 3.05), controlPoint2: CGPoint(x: 12.43, y: 3.1))
        bezier6Path.addLine(to: CGPoint(x: 11.48, y: 7.89))
        bezier6Path.addCurve(to: CGPoint(x: 11.48, y: 8.01), controlPoint1: CGPoint(x: 11.48, y: 7.89), controlPoint2: CGPoint(x: 11.48, y: 7.97))
        bezier6Path.addCurve(to: CGPoint(x: 11.99, y: 8.51), controlPoint1: CGPoint(x: 11.48, y: 8.28), controlPoint2: CGPoint(x: 11.71, y: 8.51))
        bezier6Path.addCurve(to: CGPoint(x: 12.33, y: 8.37), controlPoint1: CGPoint(x: 12.12, y: 8.51), controlPoint2: CGPoint(x: 12.25, y: 8.45))
        bezier6Path.close()
        primaryColor.setFill()
        bezier6Path.fill()
        
        
        
        context.restoreGState()
    }
    
    @objc dynamic public class func drawLane_straight(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000)) {
        
        //// Rectangle Drawing
        let rectanglePath = UIBezierPath(rect: CGRect(x: 13, y: 11, width: 4, height: 16))
        primaryColor.setFill()
        rectanglePath.fill()
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: 13.01, y: 12.92))
        bezierPath.addLine(to: CGPoint(x: 13.02, y: 11.66))
        bezierPath.addLine(to: CGPoint(x: 13.01, y: 11.66))
        bezierPath.addCurve(to: CGPoint(x: 13.01, y: 11.46), controlPoint1: CGPoint(x: 13.01, y: 11.6), controlPoint2: CGPoint(x: 13.01, y: 11.53))
        bezierPath.addCurve(to: CGPoint(x: 12.53, y: 10.94), controlPoint1: CGPoint(x: 13.01, y: 11.17), controlPoint2: CGPoint(x: 12.82, y: 10.94))
        bezierPath.addCurve(to: CGPoint(x: 12.43, y: 10.94), controlPoint1: CGPoint(x: 12.5, y: 10.94), controlPoint2: CGPoint(x: 12.46, y: 10.94))
        bezierPath.addLine(to: CGPoint(x: 12.44, y: 10.94))
        bezierPath.addLine(to: CGPoint(x: 9.71, y: 11.93))
        bezierPath.addLine(to: CGPoint(x: 9.71, y: 11.93))
        bezierPath.addCurve(to: CGPoint(x: 9.52, y: 11.97), controlPoint1: CGPoint(x: 9.65, y: 11.96), controlPoint2: CGPoint(x: 9.59, y: 11.97))
        bezierPath.addCurve(to: CGPoint(x: 9, y: 11.45), controlPoint1: CGPoint(x: 9.23, y: 11.97), controlPoint2: CGPoint(x: 9, y: 11.74))
        bezierPath.addCurve(to: CGPoint(x: 9.16, y: 11.07), controlPoint1: CGPoint(x: 9, y: 11.3), controlPoint2: CGPoint(x: 9.06, y: 11.17))
        bezierPath.addLine(to: CGPoint(x: 9.16, y: 11.08))
        bezierPath.addLine(to: CGPoint(x: 15.02, y: 3))
        bezierPath.addLine(to: CGPoint(x: 20.86, y: 11.14))
        bezierPath.addLine(to: CGPoint(x: 20.86, y: 11.14))
        bezierPath.addCurve(to: CGPoint(x: 21.02, y: 11.52), controlPoint1: CGPoint(x: 20.96, y: 11.23), controlPoint2: CGPoint(x: 21.02, y: 11.37))
        bezierPath.addCurve(to: CGPoint(x: 20.5, y: 12.03), controlPoint1: CGPoint(x: 21.02, y: 11.8), controlPoint2: CGPoint(x: 20.79, y: 12.03))
        bezierPath.addCurve(to: CGPoint(x: 20.31, y: 11.99), controlPoint1: CGPoint(x: 20.43, y: 12.03), controlPoint2: CGPoint(x: 20.37, y: 12.02))
        bezierPath.addLine(to: CGPoint(x: 20.31, y: 11.99))
        bezierPath.addLine(to: CGPoint(x: 17.58, y: 11))
        bezierPath.addLine(to: CGPoint(x: 17.59, y: 11.01))
        bezierPath.addCurve(to: CGPoint(x: 17.49, y: 11), controlPoint1: CGPoint(x: 17.56, y: 11), controlPoint2: CGPoint(x: 17.52, y: 11))
        bezierPath.addCurve(to: CGPoint(x: 17.01, y: 11.52), controlPoint1: CGPoint(x: 17.2, y: 11), controlPoint2: CGPoint(x: 17.01, y: 11.23))
        bezierPath.addCurve(to: CGPoint(x: 17.01, y: 11.73), controlPoint1: CGPoint(x: 17.01, y: 11.59), controlPoint2: CGPoint(x: 17.01, y: 11.66))
        bezierPath.addLine(to: CGPoint(x: 17, y: 11.72))
        bezierPath.addLine(to: CGPoint(x: 17.01, y: 12.99))
        bezierPath.usesEvenOddFillRule = true
        primaryColor.setFill()
        bezierPath.fill()
    }
    
    @objc dynamic public class func drawLane_right_h(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000)) {
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: 16.46, y: 4))
        bezierPath.addCurve(to: CGPoint(x: 16.77, y: 4.16), controlPoint1: CGPoint(x: 16.55, y: 4), controlPoint2: CGPoint(x: 16.68, y: 4.06))
        bezierPath.addCurve(to: CGPoint(x: 23.85, y: 10.02), controlPoint1: CGPoint(x: 16.93, y: 4.29), controlPoint2: CGPoint(x: 23.85, y: 10.02))
        bezierPath.addCurve(to: CGPoint(x: 16.72, y: 15.86), controlPoint1: CGPoint(x: 23.85, y: 10.02), controlPoint2: CGPoint(x: 16.87, y: 15.73))
        bezierPath.addCurve(to: CGPoint(x: 16.34, y: 16.02), controlPoint1: CGPoint(x: 16.62, y: 15.96), controlPoint2: CGPoint(x: 16.48, y: 16.02))
        bezierPath.addCurve(to: CGPoint(x: 15.82, y: 15.5), controlPoint1: CGPoint(x: 16.05, y: 16.02), controlPoint2: CGPoint(x: 15.82, y: 15.79))
        bezierPath.addCurve(to: CGPoint(x: 15.86, y: 15.31), controlPoint1: CGPoint(x: 15.82, y: 15.44), controlPoint2: CGPoint(x: 15.83, y: 15.37))
        bezierPath.addCurve(to: CGPoint(x: 16.85, y: 12.59), controlPoint1: CGPoint(x: 15.9, y: 15.2), controlPoint2: CGPoint(x: 16.81, y: 12.7))
        bezierPath.addCurve(to: CGPoint(x: 16.33, y: 12.01), controlPoint1: CGPoint(x: 16.85, y: 12.2), controlPoint2: CGPoint(x: 16.62, y: 12.01))
        bezierPath.addCurve(to: CGPoint(x: 16.13, y: 12.01), controlPoint1: CGPoint(x: 16.26, y: 12.01), controlPoint2: CGPoint(x: 16.19, y: 12.01))
        bezierPath.addCurve(to: CGPoint(x: 14.87, y: 12.01), controlPoint1: CGPoint(x: 16.05, y: 12), controlPoint2: CGPoint(x: 14.87, y: 12.01))
        bezierPath.addLine(to: CGPoint(x: 14.93, y: 8.01))
        bezierPath.addCurve(to: CGPoint(x: 16.19, y: 8.02), controlPoint1: CGPoint(x: 14.93, y: 8.01), controlPoint2: CGPoint(x: 16.1, y: 8.02))
        bezierPath.addCurve(to: CGPoint(x: 16.39, y: 8.01), controlPoint1: CGPoint(x: 16.25, y: 8.01), controlPoint2: CGPoint(x: 16.32, y: 8.01))
        bezierPath.addCurve(to: CGPoint(x: 16.91, y: 7.53), controlPoint1: CGPoint(x: 16.68, y: 8.01), controlPoint2: CGPoint(x: 16.91, y: 7.82))
        bezierPath.addCurve(to: CGPoint(x: 15.92, y: 4.71), controlPoint1: CGPoint(x: 16.87, y: 7.32), controlPoint2: CGPoint(x: 15.96, y: 4.82))
        bezierPath.addCurve(to: CGPoint(x: 15.88, y: 4.52), controlPoint1: CGPoint(x: 15.9, y: 4.65), controlPoint2: CGPoint(x: 15.88, y: 4.58))
        bezierPath.addCurve(to: CGPoint(x: 16.39, y: 4), controlPoint1: CGPoint(x: 15.88, y: 4.23), controlPoint2: CGPoint(x: 16.11, y: 4))
        bezierPath.addLine(to: CGPoint(x: 16.46, y: 4))
        bezierPath.close()
        primaryColor.setFill()
        bezierPath.fill()
        
        
        //// Bezier 2 Drawing
        let bezier2Path = UIBezierPath()
        bezier2Path.move(to: CGPoint(x: 9, y: 25))
        bezier2Path.addLine(to: CGPoint(x: 9.06, y: 13.56))
        bezier2Path.addCurve(to: CGPoint(x: 12.94, y: 10.03), controlPoint1: CGPoint(x: 9.06, y: 13.56), controlPoint2: CGPoint(x: 9.34, y: 10.03))
        bezier2Path.addLine(to: CGPoint(x: 20.03, y: 10.03))
        primaryColor.setStroke()
        bezier2Path.lineWidth = 4
        bezier2Path.stroke()
    }
    
    @objc dynamic public class func drawLane_straight_right(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000)) {
        
        //// Rectangle Drawing
        let rectanglePath = UIBezierPath(rect: CGRect(x: 9.05, y: 11.6, width: 4, height: 15))
        primaryColor.setFill()
        rectanglePath.fill()
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: 11.02, y: 2))
        bezierPath.addCurve(to: CGPoint(x: 16.86, y: 10.13), controlPoint1: CGPoint(x: 11.06, y: 2.06), controlPoint2: CGPoint(x: 16.74, y: 9.97))
        bezierPath.addCurve(to: CGPoint(x: 17.02, y: 10.52), controlPoint1: CGPoint(x: 16.96, y: 10.23), controlPoint2: CGPoint(x: 17.02, y: 10.37))
        bezierPath.addCurve(to: CGPoint(x: 16.5, y: 11.03), controlPoint1: CGPoint(x: 17.02, y: 10.8), controlPoint2: CGPoint(x: 16.79, y: 11.03))
        bezierPath.addCurve(to: CGPoint(x: 16.31, y: 10.99), controlPoint1: CGPoint(x: 16.44, y: 11.03), controlPoint2: CGPoint(x: 16.37, y: 11.02))
        bezierPath.addCurve(to: CGPoint(x: 13.59, y: 10), controlPoint1: CGPoint(x: 16.2, y: 10.95), controlPoint2: CGPoint(x: 13.69, y: 10.04))
        bezierPath.addCurve(to: CGPoint(x: 13.01, y: 10.52), controlPoint1: CGPoint(x: 13.2, y: 10), controlPoint2: CGPoint(x: 13.01, y: 10.23))
        bezierPath.addCurve(to: CGPoint(x: 13, y: 10.72), controlPoint1: CGPoint(x: 13.01, y: 10.59), controlPoint2: CGPoint(x: 13, y: 10.66))
        bezierPath.addCurve(to: CGPoint(x: 13.01, y: 11.99), controlPoint1: CGPoint(x: 13, y: 10.8), controlPoint2: CGPoint(x: 13.01, y: 11.99))
        bezierPath.addLine(to: CGPoint(x: 9.01, y: 11.92))
        bezierPath.addCurve(to: CGPoint(x: 9.02, y: 10.66), controlPoint1: CGPoint(x: 9.01, y: 11.92), controlPoint2: CGPoint(x: 9.02, y: 10.75))
        bezierPath.addCurve(to: CGPoint(x: 9.01, y: 10.46), controlPoint1: CGPoint(x: 9.01, y: 10.6), controlPoint2: CGPoint(x: 9.01, y: 10.53))
        bezierPath.addCurve(to: CGPoint(x: 8.53, y: 9.94), controlPoint1: CGPoint(x: 9.01, y: 10.17), controlPoint2: CGPoint(x: 8.82, y: 9.94))
        bezierPath.addCurve(to: CGPoint(x: 5.71, y: 10.93), controlPoint1: CGPoint(x: 8.32, y: 9.98), controlPoint2: CGPoint(x: 5.82, y: 10.89))
        bezierPath.addCurve(to: CGPoint(x: 5.52, y: 10.97), controlPoint1: CGPoint(x: 5.65, y: 10.96), controlPoint2: CGPoint(x: 5.58, y: 10.97))
        bezierPath.addCurve(to: CGPoint(x: 5, y: 10.46), controlPoint1: CGPoint(x: 5.23, y: 10.97), controlPoint2: CGPoint(x: 5, y: 10.74))
        bezierPath.addCurve(to: CGPoint(x: 5.16, y: 10.08), controlPoint1: CGPoint(x: 5, y: 10.3), controlPoint2: CGPoint(x: 5.06, y: 10.17))
        bezierPath.addCurve(to: CGPoint(x: 11.01, y: 2), controlPoint1: CGPoint(x: 5.28, y: 9.9), controlPoint2: CGPoint(x: 10.97, y: 2.06))
        bezierPath.addLine(to: CGPoint(x: 11.02, y: 2))
        bezierPath.close()
        primaryColor.setFill()
        bezierPath.fill()
        
        
        //// Bezier 2 Drawing
        let bezier2Path = UIBezierPath()
        bezier2Path.move(to: CGPoint(x: 18.05, y: 14.59))
        bezier2Path.addLine(to: CGPoint(x: 19.31, y: 14.59))
        bezier2Path.addLine(to: CGPoint(x: 19.31, y: 14.59))
        bezier2Path.addCurve(to: CGPoint(x: 19.51, y: 14.59), controlPoint1: CGPoint(x: 19.37, y: 14.59), controlPoint2: CGPoint(x: 19.44, y: 14.59))
        bezier2Path.addCurve(to: CGPoint(x: 20.03, y: 14.1), controlPoint1: CGPoint(x: 19.8, y: 14.59), controlPoint2: CGPoint(x: 20.03, y: 14.4))
        bezier2Path.addCurve(to: CGPoint(x: 20.03, y: 14.01), controlPoint1: CGPoint(x: 20.03, y: 14.07), controlPoint2: CGPoint(x: 20.03, y: 14.04))
        bezier2Path.addLine(to: CGPoint(x: 20.03, y: 14.01))
        bezier2Path.addLine(to: CGPoint(x: 19.04, y: 11.28))
        bezier2Path.addLine(to: CGPoint(x: 19.04, y: 11.29))
        bezier2Path.addCurve(to: CGPoint(x: 19, y: 11.09), controlPoint1: CGPoint(x: 19.02, y: 11.23), controlPoint2: CGPoint(x: 19, y: 11.16))
        bezier2Path.addCurve(to: CGPoint(x: 19.52, y: 10.58), controlPoint1: CGPoint(x: 19, y: 10.81), controlPoint2: CGPoint(x: 19.23, y: 10.58))
        bezier2Path.addCurve(to: CGPoint(x: 19.9, y: 10.74), controlPoint1: CGPoint(x: 19.67, y: 10.58), controlPoint2: CGPoint(x: 19.8, y: 10.64))
        bezier2Path.addLine(to: CGPoint(x: 19.9, y: 10.74))
        bezier2Path.addLine(to: CGPoint(x: 26.97, y: 16.59))
        bezier2Path.addLine(to: CGPoint(x: 19.83, y: 22.44))
        bezier2Path.addLine(to: CGPoint(x: 19.84, y: 22.43))
        bezier2Path.addCurve(to: CGPoint(x: 19.46, y: 22.6), controlPoint1: CGPoint(x: 19.74, y: 22.53), controlPoint2: CGPoint(x: 19.6, y: 22.6))
        bezier2Path.addCurve(to: CGPoint(x: 18.94, y: 22.08), controlPoint1: CGPoint(x: 19.17, y: 22.6), controlPoint2: CGPoint(x: 18.94, y: 22.37))
        bezier2Path.addCurve(to: CGPoint(x: 18.98, y: 21.89), controlPoint1: CGPoint(x: 18.94, y: 22.01), controlPoint2: CGPoint(x: 18.95, y: 21.95))
        bezier2Path.addLine(to: CGPoint(x: 18.98, y: 21.89))
        bezier2Path.addLine(to: CGPoint(x: 19.97, y: 19.16))
        bezier2Path.addLine(to: CGPoint(x: 19.97, y: 19.16))
        bezier2Path.addCurve(to: CGPoint(x: 19.97, y: 19.07), controlPoint1: CGPoint(x: 19.97, y: 19.14), controlPoint2: CGPoint(x: 19.97, y: 19.1))
        bezier2Path.addCurve(to: CGPoint(x: 19.45, y: 18.59), controlPoint1: CGPoint(x: 19.97, y: 18.78), controlPoint2: CGPoint(x: 19.74, y: 18.59))
        bezier2Path.addCurve(to: CGPoint(x: 19.25, y: 18.58), controlPoint1: CGPoint(x: 19.38, y: 18.59), controlPoint2: CGPoint(x: 19.31, y: 18.58))
        bezier2Path.addLine(to: CGPoint(x: 19.25, y: 18.58))
        bezier2Path.addLine(to: CGPoint(x: 17.99, y: 18.59))
        bezier2Path.usesEvenOddFillRule = true
        primaryColor.setFill()
        bezier2Path.fill()
        
        
        //// Bezier 3 Drawing
        let bezier3Path = UIBezierPath()
        bezier3Path.move(to: CGPoint(x: 11.03, y: 27))
        bezier3Path.addLine(to: CGPoint(x: 11.03, y: 22.87))
        bezier3Path.addCurve(to: CGPoint(x: 13, y: 18.61), controlPoint1: CGPoint(x: 11.03, y: 21.23), controlPoint2: CGPoint(x: 11.73, y: 19.65))
        bezier3Path.addCurve(to: CGPoint(x: 17.84, y: 16.61), controlPoint1: CGPoint(x: 14.23, y: 17.61), controlPoint2: CGPoint(x: 15.93, y: 16.61))
        bezier3Path.addLine(to: CGPoint(x: 20.03, y: 16.61))
        primaryColor.setStroke()
        bezier3Path.lineWidth = 4
        bezier3Path.stroke()
    }
    
    @objc dynamic public class func drawLane_right_only(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), secondaryColor: UIColor = UIColor(red: 0.618, green: 0.618, blue: 0.618, alpha: 1.000)) {
        
        //// Rectangle Drawing
        let rectanglePath = UIBezierPath(rect: CGRect(x: 9.05, y: 11.6, width: 4, height: 15))
        secondaryColor.setFill()
        rectanglePath.fill()
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: 11.02, y: 2))
        bezierPath.addCurve(to: CGPoint(x: 16.86, y: 10.13), controlPoint1: CGPoint(x: 11.06, y: 2.06), controlPoint2: CGPoint(x: 16.74, y: 9.97))
        bezierPath.addCurve(to: CGPoint(x: 17.02, y: 10.52), controlPoint1: CGPoint(x: 16.96, y: 10.23), controlPoint2: CGPoint(x: 17.02, y: 10.37))
        bezierPath.addCurve(to: CGPoint(x: 16.5, y: 11.03), controlPoint1: CGPoint(x: 17.02, y: 10.8), controlPoint2: CGPoint(x: 16.79, y: 11.03))
        bezierPath.addCurve(to: CGPoint(x: 16.31, y: 10.99), controlPoint1: CGPoint(x: 16.44, y: 11.03), controlPoint2: CGPoint(x: 16.37, y: 11.02))
        bezierPath.addCurve(to: CGPoint(x: 13.59, y: 10), controlPoint1: CGPoint(x: 16.2, y: 10.95), controlPoint2: CGPoint(x: 13.69, y: 10.04))
        bezierPath.addCurve(to: CGPoint(x: 13.01, y: 10.52), controlPoint1: CGPoint(x: 13.2, y: 10), controlPoint2: CGPoint(x: 13.01, y: 10.23))
        bezierPath.addCurve(to: CGPoint(x: 13, y: 10.72), controlPoint1: CGPoint(x: 13.01, y: 10.59), controlPoint2: CGPoint(x: 13, y: 10.66))
        bezierPath.addCurve(to: CGPoint(x: 13.01, y: 11.99), controlPoint1: CGPoint(x: 13, y: 10.8), controlPoint2: CGPoint(x: 13.01, y: 11.99))
        bezierPath.addLine(to: CGPoint(x: 9.01, y: 11.92))
        bezierPath.addCurve(to: CGPoint(x: 9.02, y: 10.66), controlPoint1: CGPoint(x: 9.01, y: 11.92), controlPoint2: CGPoint(x: 9.02, y: 10.75))
        bezierPath.addCurve(to: CGPoint(x: 9.01, y: 10.46), controlPoint1: CGPoint(x: 9.01, y: 10.6), controlPoint2: CGPoint(x: 9.01, y: 10.53))
        bezierPath.addCurve(to: CGPoint(x: 8.53, y: 9.94), controlPoint1: CGPoint(x: 9.01, y: 10.17), controlPoint2: CGPoint(x: 8.82, y: 9.94))
        bezierPath.addCurve(to: CGPoint(x: 5.71, y: 10.93), controlPoint1: CGPoint(x: 8.32, y: 9.98), controlPoint2: CGPoint(x: 5.82, y: 10.89))
        bezierPath.addCurve(to: CGPoint(x: 5.52, y: 10.97), controlPoint1: CGPoint(x: 5.65, y: 10.96), controlPoint2: CGPoint(x: 5.58, y: 10.97))
        bezierPath.addCurve(to: CGPoint(x: 5, y: 10.46), controlPoint1: CGPoint(x: 5.23, y: 10.97), controlPoint2: CGPoint(x: 5, y: 10.74))
        bezierPath.addCurve(to: CGPoint(x: 5.16, y: 10.08), controlPoint1: CGPoint(x: 5, y: 10.3), controlPoint2: CGPoint(x: 5.06, y: 10.17))
        bezierPath.addCurve(to: CGPoint(x: 11.01, y: 2), controlPoint1: CGPoint(x: 5.28, y: 9.9), controlPoint2: CGPoint(x: 10.97, y: 2.06))
        bezierPath.addLine(to: CGPoint(x: 11.02, y: 2))
        bezierPath.close()
        secondaryColor.setFill()
        bezierPath.fill()
        
        
        //// Bezier 2 Drawing
        let bezier2Path = UIBezierPath()
        bezier2Path.move(to: CGPoint(x: 18.05, y: 14.59))
        bezier2Path.addLine(to: CGPoint(x: 19.31, y: 14.59))
        bezier2Path.addLine(to: CGPoint(x: 19.31, y: 14.59))
        bezier2Path.addCurve(to: CGPoint(x: 19.51, y: 14.59), controlPoint1: CGPoint(x: 19.37, y: 14.59), controlPoint2: CGPoint(x: 19.44, y: 14.59))
        bezier2Path.addCurve(to: CGPoint(x: 20.03, y: 14.1), controlPoint1: CGPoint(x: 19.8, y: 14.59), controlPoint2: CGPoint(x: 20.03, y: 14.4))
        bezier2Path.addCurve(to: CGPoint(x: 20.03, y: 14.01), controlPoint1: CGPoint(x: 20.03, y: 14.07), controlPoint2: CGPoint(x: 20.03, y: 14.04))
        bezier2Path.addLine(to: CGPoint(x: 20.03, y: 14.01))
        bezier2Path.addLine(to: CGPoint(x: 19.04, y: 11.28))
        bezier2Path.addLine(to: CGPoint(x: 19.04, y: 11.29))
        bezier2Path.addCurve(to: CGPoint(x: 19, y: 11.09), controlPoint1: CGPoint(x: 19.02, y: 11.23), controlPoint2: CGPoint(x: 19, y: 11.16))
        bezier2Path.addCurve(to: CGPoint(x: 19.52, y: 10.58), controlPoint1: CGPoint(x: 19, y: 10.81), controlPoint2: CGPoint(x: 19.23, y: 10.58))
        bezier2Path.addCurve(to: CGPoint(x: 19.9, y: 10.74), controlPoint1: CGPoint(x: 19.67, y: 10.58), controlPoint2: CGPoint(x: 19.8, y: 10.64))
        bezier2Path.addLine(to: CGPoint(x: 19.9, y: 10.74))
        bezier2Path.addLine(to: CGPoint(x: 26.97, y: 16.59))
        bezier2Path.addLine(to: CGPoint(x: 19.83, y: 22.44))
        bezier2Path.addLine(to: CGPoint(x: 19.84, y: 22.43))
        bezier2Path.addCurve(to: CGPoint(x: 19.46, y: 22.6), controlPoint1: CGPoint(x: 19.74, y: 22.53), controlPoint2: CGPoint(x: 19.6, y: 22.6))
        bezier2Path.addCurve(to: CGPoint(x: 18.94, y: 22.08), controlPoint1: CGPoint(x: 19.17, y: 22.6), controlPoint2: CGPoint(x: 18.94, y: 22.37))
        bezier2Path.addCurve(to: CGPoint(x: 18.98, y: 21.89), controlPoint1: CGPoint(x: 18.94, y: 22.01), controlPoint2: CGPoint(x: 18.95, y: 21.95))
        bezier2Path.addLine(to: CGPoint(x: 18.98, y: 21.89))
        bezier2Path.addLine(to: CGPoint(x: 19.97, y: 19.16))
        bezier2Path.addLine(to: CGPoint(x: 19.97, y: 19.16))
        bezier2Path.addCurve(to: CGPoint(x: 19.97, y: 19.07), controlPoint1: CGPoint(x: 19.97, y: 19.14), controlPoint2: CGPoint(x: 19.97, y: 19.1))
        bezier2Path.addCurve(to: CGPoint(x: 19.45, y: 18.59), controlPoint1: CGPoint(x: 19.97, y: 18.78), controlPoint2: CGPoint(x: 19.74, y: 18.59))
        bezier2Path.addCurve(to: CGPoint(x: 19.25, y: 18.58), controlPoint1: CGPoint(x: 19.38, y: 18.59), controlPoint2: CGPoint(x: 19.31, y: 18.58))
        bezier2Path.addLine(to: CGPoint(x: 19.25, y: 18.58))
        bezier2Path.addLine(to: CGPoint(x: 17.99, y: 18.59))
        bezier2Path.usesEvenOddFillRule = true
        primaryColor.setFill()
        bezier2Path.fill()
        
        
        //// Bezier 3 Drawing
        let bezier3Path = UIBezierPath()
        bezier3Path.move(to: CGPoint(x: 11.03, y: 27))
        bezier3Path.addLine(to: CGPoint(x: 11.03, y: 22.87))
        bezier3Path.addCurve(to: CGPoint(x: 13, y: 18.61), controlPoint1: CGPoint(x: 11.03, y: 21.23), controlPoint2: CGPoint(x: 11.73, y: 19.65))
        bezier3Path.addCurve(to: CGPoint(x: 17.84, y: 16.61), controlPoint1: CGPoint(x: 14.23, y: 17.61), controlPoint2: CGPoint(x: 15.93, y: 16.61))
        bezier3Path.addLine(to: CGPoint(x: 20.03, y: 16.61))
        primaryColor.setStroke()
        bezier3Path.lineWidth = 4
        bezier3Path.stroke()
    }
    
    @objc dynamic public class func drawLane_straight_only(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000), secondaryColor: UIColor = UIColor(red: 0.618, green: 0.618, blue: 0.618, alpha: 1.000)) {
        
        //// Bezier 2 Drawing
        let bezier2Path = UIBezierPath()
        bezier2Path.move(to: CGPoint(x: 18.05, y: 14.59))
        bezier2Path.addLine(to: CGPoint(x: 19.31, y: 14.59))
        bezier2Path.addLine(to: CGPoint(x: 19.31, y: 14.59))
        bezier2Path.addCurve(to: CGPoint(x: 19.51, y: 14.59), controlPoint1: CGPoint(x: 19.37, y: 14.59), controlPoint2: CGPoint(x: 19.44, y: 14.59))
        bezier2Path.addCurve(to: CGPoint(x: 20.03, y: 14.1), controlPoint1: CGPoint(x: 19.8, y: 14.59), controlPoint2: CGPoint(x: 20.03, y: 14.4))
        bezier2Path.addCurve(to: CGPoint(x: 20.03, y: 14.01), controlPoint1: CGPoint(x: 20.03, y: 14.07), controlPoint2: CGPoint(x: 20.03, y: 14.04))
        bezier2Path.addLine(to: CGPoint(x: 20.03, y: 14.01))
        bezier2Path.addLine(to: CGPoint(x: 19.04, y: 11.28))
        bezier2Path.addLine(to: CGPoint(x: 19.04, y: 11.29))
        bezier2Path.addCurve(to: CGPoint(x: 19, y: 11.09), controlPoint1: CGPoint(x: 19.02, y: 11.23), controlPoint2: CGPoint(x: 19, y: 11.16))
        bezier2Path.addCurve(to: CGPoint(x: 19.52, y: 10.58), controlPoint1: CGPoint(x: 19, y: 10.81), controlPoint2: CGPoint(x: 19.23, y: 10.58))
        bezier2Path.addCurve(to: CGPoint(x: 19.9, y: 10.74), controlPoint1: CGPoint(x: 19.67, y: 10.58), controlPoint2: CGPoint(x: 19.8, y: 10.64))
        bezier2Path.addLine(to: CGPoint(x: 19.9, y: 10.74))
        bezier2Path.addLine(to: CGPoint(x: 26.97, y: 16.59))
        bezier2Path.addLine(to: CGPoint(x: 19.83, y: 22.44))
        bezier2Path.addLine(to: CGPoint(x: 19.84, y: 22.43))
        bezier2Path.addCurve(to: CGPoint(x: 19.46, y: 22.6), controlPoint1: CGPoint(x: 19.74, y: 22.53), controlPoint2: CGPoint(x: 19.6, y: 22.6))
        bezier2Path.addCurve(to: CGPoint(x: 18.94, y: 22.08), controlPoint1: CGPoint(x: 19.17, y: 22.6), controlPoint2: CGPoint(x: 18.94, y: 22.37))
        bezier2Path.addCurve(to: CGPoint(x: 18.98, y: 21.89), controlPoint1: CGPoint(x: 18.94, y: 22.01), controlPoint2: CGPoint(x: 18.95, y: 21.95))
        bezier2Path.addLine(to: CGPoint(x: 18.98, y: 21.89))
        bezier2Path.addLine(to: CGPoint(x: 19.97, y: 19.16))
        bezier2Path.addLine(to: CGPoint(x: 19.97, y: 19.16))
        bezier2Path.addCurve(to: CGPoint(x: 19.97, y: 19.07), controlPoint1: CGPoint(x: 19.97, y: 19.14), controlPoint2: CGPoint(x: 19.97, y: 19.1))
        bezier2Path.addCurve(to: CGPoint(x: 19.45, y: 18.59), controlPoint1: CGPoint(x: 19.97, y: 18.78), controlPoint2: CGPoint(x: 19.74, y: 18.59))
        bezier2Path.addCurve(to: CGPoint(x: 19.25, y: 18.58), controlPoint1: CGPoint(x: 19.38, y: 18.59), controlPoint2: CGPoint(x: 19.31, y: 18.58))
        bezier2Path.addLine(to: CGPoint(x: 19.25, y: 18.58))
        bezier2Path.addLine(to: CGPoint(x: 17.99, y: 18.59))
        bezier2Path.usesEvenOddFillRule = true
        secondaryColor.setFill()
        bezier2Path.fill()
        
        
        //// Bezier 3 Drawing
        let bezier3Path = UIBezierPath()
        bezier3Path.move(to: CGPoint(x: 11.03, y: 27))
        bezier3Path.addLine(to: CGPoint(x: 11.03, y: 22.87))
        bezier3Path.addCurve(to: CGPoint(x: 13, y: 18.61), controlPoint1: CGPoint(x: 11.03, y: 21.23), controlPoint2: CGPoint(x: 11.73, y: 19.65))
        bezier3Path.addCurve(to: CGPoint(x: 17.84, y: 16.61), controlPoint1: CGPoint(x: 14.23, y: 17.61), controlPoint2: CGPoint(x: 15.93, y: 16.61))
        bezier3Path.addLine(to: CGPoint(x: 20.03, y: 16.61))
        secondaryColor.setStroke()
        bezier3Path.lineWidth = 4
        bezier3Path.stroke()
        
        
        //// Rectangle Drawing
        let rectanglePath = UIBezierPath(rect: CGRect(x: 9.05, y: 11.6, width: 4, height: 15))
        primaryColor.setFill()
        rectanglePath.fill()
        
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: 11.02, y: 2))
        bezierPath.addCurve(to: CGPoint(x: 16.86, y: 10.13), controlPoint1: CGPoint(x: 11.06, y: 2.06), controlPoint2: CGPoint(x: 16.74, y: 9.97))
        bezierPath.addCurve(to: CGPoint(x: 17.02, y: 10.52), controlPoint1: CGPoint(x: 16.96, y: 10.23), controlPoint2: CGPoint(x: 17.02, y: 10.37))
        bezierPath.addCurve(to: CGPoint(x: 16.5, y: 11.03), controlPoint1: CGPoint(x: 17.02, y: 10.8), controlPoint2: CGPoint(x: 16.79, y: 11.03))
        bezierPath.addCurve(to: CGPoint(x: 16.31, y: 10.99), controlPoint1: CGPoint(x: 16.44, y: 11.03), controlPoint2: CGPoint(x: 16.37, y: 11.02))
        bezierPath.addCurve(to: CGPoint(x: 13.59, y: 10), controlPoint1: CGPoint(x: 16.2, y: 10.95), controlPoint2: CGPoint(x: 13.69, y: 10.04))
        bezierPath.addCurve(to: CGPoint(x: 13.01, y: 10.52), controlPoint1: CGPoint(x: 13.2, y: 10), controlPoint2: CGPoint(x: 13.01, y: 10.23))
        bezierPath.addCurve(to: CGPoint(x: 13, y: 10.72), controlPoint1: CGPoint(x: 13.01, y: 10.59), controlPoint2: CGPoint(x: 13, y: 10.66))
        bezierPath.addCurve(to: CGPoint(x: 13.01, y: 11.99), controlPoint1: CGPoint(x: 13, y: 10.8), controlPoint2: CGPoint(x: 13.01, y: 11.99))
        bezierPath.addLine(to: CGPoint(x: 9.01, y: 11.92))
        bezierPath.addCurve(to: CGPoint(x: 9.02, y: 10.66), controlPoint1: CGPoint(x: 9.01, y: 11.92), controlPoint2: CGPoint(x: 9.02, y: 10.75))
        bezierPath.addCurve(to: CGPoint(x: 9.01, y: 10.46), controlPoint1: CGPoint(x: 9.01, y: 10.6), controlPoint2: CGPoint(x: 9.01, y: 10.53))
        bezierPath.addCurve(to: CGPoint(x: 8.53, y: 9.94), controlPoint1: CGPoint(x: 9.01, y: 10.17), controlPoint2: CGPoint(x: 8.82, y: 9.94))
        bezierPath.addCurve(to: CGPoint(x: 5.71, y: 10.93), controlPoint1: CGPoint(x: 8.32, y: 9.98), controlPoint2: CGPoint(x: 5.82, y: 10.89))
        bezierPath.addCurve(to: CGPoint(x: 5.52, y: 10.97), controlPoint1: CGPoint(x: 5.65, y: 10.96), controlPoint2: CGPoint(x: 5.58, y: 10.97))
        bezierPath.addCurve(to: CGPoint(x: 5, y: 10.46), controlPoint1: CGPoint(x: 5.23, y: 10.97), controlPoint2: CGPoint(x: 5, y: 10.74))
        bezierPath.addCurve(to: CGPoint(x: 5.16, y: 10.08), controlPoint1: CGPoint(x: 5, y: 10.3), controlPoint2: CGPoint(x: 5.06, y: 10.17))
        bezierPath.addCurve(to: CGPoint(x: 11.01, y: 2), controlPoint1: CGPoint(x: 5.28, y: 9.9), controlPoint2: CGPoint(x: 10.97, y: 2.06))
        bezierPath.addLine(to: CGPoint(x: 11.02, y: 2))
        bezierPath.close()
        primaryColor.setFill()
        bezierPath.fill()
    }
    
    @objc dynamic public class func drawLane_uturn(primaryColor: UIColor = UIColor(red: 0.000, green: 0.000, blue: 0.000, alpha: 1.000)) {
        
        //// Bezier Drawing
        let bezierPath = UIBezierPath()
        bezierPath.move(to: CGPoint(x: 19, y: 20))
        bezierPath.addLine(to: CGPoint(x: 19, y: 11.26))
        bezierPath.addCurve(to: CGPoint(x: 14, y: 5), controlPoint1: CGPoint(x: 19, y: 9.62), controlPoint2: CGPoint(x: 19, y: 5))
        bezierPath.addCurve(to: CGPoint(x: 9, y: 11), controlPoint1: CGPoint(x: 9, y: 5), controlPoint2: CGPoint(x: 9, y: 11))
        bezierPath.addLine(to: CGPoint(x: 9, y: 27))
        primaryColor.setStroke()
        bezierPath.lineWidth = 4
        bezierPath.stroke()
        
        
        //// Bezier 2 Drawing
        let bezier2Path = UIBezierPath()
        bezier2Path.move(to: CGPoint(x: 21.02, y: 18.05))
        bezier2Path.addCurve(to: CGPoint(x: 21.01, y: 19.31), controlPoint1: CGPoint(x: 21.02, y: 18.05), controlPoint2: CGPoint(x: 21.01, y: 19.22))
        bezier2Path.addCurve(to: CGPoint(x: 21.02, y: 19.51), controlPoint1: CGPoint(x: 21.02, y: 19.37), controlPoint2: CGPoint(x: 21.02, y: 19.44))
        bezier2Path.addCurve(to: CGPoint(x: 21.5, y: 20.03), controlPoint1: CGPoint(x: 21.02, y: 19.8), controlPoint2: CGPoint(x: 21.21, y: 20.03))
        bezier2Path.addCurve(to: CGPoint(x: 24.32, y: 19.04), controlPoint1: CGPoint(x: 21.71, y: 19.99), controlPoint2: CGPoint(x: 24.21, y: 19.08))
        bezier2Path.addCurve(to: CGPoint(x: 24.51, y: 19), controlPoint1: CGPoint(x: 24.38, y: 19.02), controlPoint2: CGPoint(x: 24.45, y: 19))
        bezier2Path.addCurve(to: CGPoint(x: 25, y: 19.34), controlPoint1: CGPoint(x: 24.74, y: 19), controlPoint2: CGPoint(x: 24.93, y: 19.15))
        bezier2Path.addLine(to: CGPoint(x: 25, y: 19.52))
        bezier2Path.addLine(to: CGPoint(x: 25, y: 19.69))
        bezier2Path.addCurve(to: CGPoint(x: 24.87, y: 19.89), controlPoint1: CGPoint(x: 24.97, y: 19.77), controlPoint2: CGPoint(x: 24.93, y: 19.84))
        bezier2Path.addCurve(to: CGPoint(x: 19.02, y: 26.97), controlPoint1: CGPoint(x: 24.74, y: 20.05), controlPoint2: CGPoint(x: 19.02, y: 26.97))
        bezier2Path.addCurve(to: CGPoint(x: 15.31, y: 22.44), controlPoint1: CGPoint(x: 19.02, y: 26.97), controlPoint2: CGPoint(x: 16.98, y: 24.48))
        bezier2Path.addCurve(to: CGPoint(x: 13.17, y: 19.84), controlPoint1: CGPoint(x: 14.18, y: 21.07), controlPoint2: CGPoint(x: 13.23, y: 19.9))
        bezier2Path.addCurve(to: CGPoint(x: 13.01, y: 19.46), controlPoint1: CGPoint(x: 13.07, y: 19.74), controlPoint2: CGPoint(x: 13.01, y: 19.6))
        bezier2Path.addCurve(to: CGPoint(x: 13.53, y: 18.94), controlPoint1: CGPoint(x: 13.01, y: 19.17), controlPoint2: CGPoint(x: 13.24, y: 18.94))
        bezier2Path.addCurve(to: CGPoint(x: 13.72, y: 18.98), controlPoint1: CGPoint(x: 13.6, y: 18.94), controlPoint2: CGPoint(x: 13.66, y: 18.95))
        bezier2Path.addCurve(to: CGPoint(x: 16.44, y: 19.97), controlPoint1: CGPoint(x: 13.83, y: 19.02), controlPoint2: CGPoint(x: 16.34, y: 19.93))
        bezier2Path.addCurve(to: CGPoint(x: 17.02, y: 19.45), controlPoint1: CGPoint(x: 16.83, y: 19.97), controlPoint2: CGPoint(x: 17.02, y: 19.74))
        bezier2Path.addCurve(to: CGPoint(x: 17.03, y: 19.25), controlPoint1: CGPoint(x: 17.02, y: 19.38), controlPoint2: CGPoint(x: 17.03, y: 19.31))
        bezier2Path.addCurve(to: CGPoint(x: 17.02, y: 17.99), controlPoint1: CGPoint(x: 17.03, y: 19.17), controlPoint2: CGPoint(x: 17.02, y: 17.99))
        bezier2Path.addLine(to: CGPoint(x: 21.02, y: 18.05))
        bezier2Path.close()
        primaryColor.setFill()
        bezier2Path.fill()
    }
    
}
